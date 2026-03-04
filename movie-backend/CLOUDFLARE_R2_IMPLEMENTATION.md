# Cloudflare R2 Storage Implementation Guide

## Overview

This document outlines the complete implementation of Cloudflare R2 object storage for movie file uploads, replacing local disk storage. This implementation uses S3-compatible APIs to store video files and thumbnails in a cloud bucket, with only file references stored in the database.

---

## Implementation Details

### 1. Architecture Decision

**What Was Implemented:**

- Server-side upload from backend to R2
- Memory-based file buffering (no local disk writes)
- Database stores only R2 object keys, not full URLs
- Automatic cleanup on transaction failures

**Why This Approach:**

- Direct client-to-R2 uploads would require presigned URLs and webhook handling
- Server-side upload gives immediate control and validation
- Memory storage reduces I/O operations and disk usage
- Key-only storage allows flexible URL generation (public/private/CDN)

---

### 2. Files Created

#### `src/config/r2.config.ts`

**Purpose:** Initialize S3-compatible R2 client with credentials

**Key Features:**

- Validates required environment variables at startup
- Creates singleton S3Client instance
- Exports bucket configuration

**Production Considerations:**

- ✅ Fails fast if credentials missing (prevents runtime errors)
- ✅ Reuses single client instance (connection pooling)
- ⚠️ Credentials in environment variables (ensure proper secret management)
- ⚠️ No retry logic configured (may need adjustment for flaky networks)

**Configuration:**

```typescript
region: "auto"  // R2 requirement
endpoint: https://{account_id}.r2.cloudflarestorage.com
```

---

#### `src/services/r2.service.ts`

**Purpose:** Handle R2 upload and delete operations

**Key Features:**

- `uploadToR2()`: Streams file buffer to R2 with unique keys
- `deleteFromR2()`: Removes objects from bucket
- Automatic file extension detection from MIME type
- UUID-based file organization: `movies/{uuid}/{type}.{ext}`

**Production Considerations:**

**Pros:**

- ✅ Organized folder structure prevents naming conflicts
- ✅ Returns both key and URL for flexibility
- ✅ Error handling with descriptive messages
- ✅ Uses `@aws-sdk/lib-storage` for multipart uploads (handles large files)

**Cons:**

- ⚠️ No upload progress tracking (could add for large files)
- ⚠️ No retry logic on network failures
- ⚠️ No bandwidth throttling (could overwhelm network)
- ⚠️ Delete errors are logged but not re-thrown (cleanup may fail silently)

**Potential Issues:**

1. **Large file uploads:** May timeout on slow connections
   - **Solution:** Implement timeout configuration and retry logic
2. **Concurrent uploads:** No rate limiting
   - **Solution:** Add queue management for bulk uploads
3. **Failed cleanup:** If deleteFromR2 fails, orphaned files remain
   - **Solution:** Implement background cleanup job scanning for orphaned files

---

### 3. Files Modified

#### `src/routes/admin.routes.ts`

**Changes:**

- Removed disk storage configuration
- Switched to `multer.memoryStorage()`
- Added comprehensive file type validation
- Consolidated validation logic in route layer

**Before vs After:**

| Aspect      | Before                    | After                  |
| ----------- | ------------------------- | ---------------------- |
| Storage     | Disk (`uploads/`)         | Memory (buffer)        |
| Validation  | Separate filter functions | Inline fileFilter      |
| File Access | `file.path`               | `file.buffer`          |
| Cleanup     | Manual disk cleanup       | No disk files to clean |

**Production Considerations:**

**Pros:**

- ✅ No disk I/O (faster processing)
- ✅ No orphaned local files
- ✅ Centralized validation logic
- ✅ Better error messages for invalid file types

**Cons:**

- ⚠️ Files held in memory (RAM usage concern)
- ⚠️ 2GB file size limit in Multer config
- ⚠️ No support for resumable uploads
- ⚠️ Server restart loses in-progress uploads

**Memory Management:**

- With 2GB file limit and concurrent uploads, could use significant RAM
- **Recommendation:** Monitor memory usage, consider streaming directly to R2 without buffering for very large files

---

#### `src/controllers/admin.controller.ts`

**Changes:**

- Import R2 service functions
- Upload files to R2 before database save
- Track uploaded keys for cleanup
- Automatic R2 cleanup on database transaction failure

**Upload Flow:**

```
1. Validate request (auth, files, fields)
2. Upload thumbnail to R2 → get key
3. Upload video to R2 → get key
4. Save metadata to database (with R2 keys)
5. Return success response

Error Path:
- If step 3 fails: cleanup thumbnail from R2
- If step 4 fails: cleanup both files from R2
```

**Production Considerations:**

**Pros:**

- ✅ Transactional consistency (files removed if DB save fails)
- ✅ Clear error messages
- ✅ Prevents orphaned files in R2
- ✅ Preserves existing validation logic

**Cons:**

- ⚠️ Cleanup is asynchronous with `.catch()` (errors logged, not thrown)
- ⚠️ No rollback if cleanup itself fails
- ⚠️ Sequential uploads (thumbnail, then video) - could parallelize
- ⚠️ Network failures during upload leave partial state

**Potential Issues:**

1. **Network failure after thumbnail upload:** Video upload may fail, leaving orphaned thumbnail
   - **Current:** Cleanup attempts to delete
   - **Risk:** If cleanup also fails, orphaned file remains
   - **Solution:** Background job to find and clean orphaned files

2. **Database deadlock during save:** Files already in R2
   - **Current:** Cleanup deletes files
   - **Risk:** User sees error, retries, uploads duplicate files
   - **Solution:** Idempotency keys or check for existing files before upload

---

#### `.env` Configuration

**Changes:**

- Renamed `R2_BUCKET_NAME` → `R2_BUCKET`
- Renamed `R2_PUBLIC_URL` → `R2_PUBLIC_BASE_URL`
- Added `.env.example` template

**Environment Variables:**

```env
R2_ACCOUNT_ID          # Cloudflare account ID
R2_ACCESS_KEY_ID       # R2 API token access key
R2_SECRET_ACCESS_KEY   # R2 API token secret
R2_BUCKET              # Bucket name
R2_PUBLIC_BASE_URL     # Public URL (if bucket is public)
```

**Production Considerations:**

**Security:**

- ⚠️ Credentials in plain text .env file
- ⚠️ No credential rotation mechanism
- ⚠️ Access key has full bucket permissions

**Recommendations:**

- Use secret management service (AWS Secrets Manager, HashiCorp Vault)
- Implement credential rotation
- Create R2 API token with minimum required permissions
- Never commit `.env` to version control (add to `.gitignore`)

---

## Production Readiness Assessment

### ✅ Ready for Production

1. **Functional Core:** Upload and cleanup logic works correctly
2. **Error Handling:** Basic error catching and cleanup
3. **Validation:** File type and size validation in place
4. **Organization:** Clean folder structure in R2

### ⚠️ Needs Improvement

1. **Monitoring and Observability:**
   - No upload progress tracking
   - No metrics collection (upload time, file sizes, failure rates)
   - Basic console logging (should use structured logger)
   - No alerting on repeated failures

2. **Resilience:**
   - No retry logic for transient failures
   - No timeout configuration
   - No circuit breaker pattern
   - No rate limiting on uploads

3. **Scalability:**
   - Memory buffering limits concurrent uploads
   - No distributed upload queue
   - No load balancing considerations
   - Single-point-of-failure (one server)

4. **Security:**
   - Credentials in environment variables
   - No IP allowlisting on R2
   - No request signing validation
   - Admin role assignment requires database access

5. **Operations:**
   - No orphaned file cleanup mechanism
   - No migration tooling for existing files
   - No backup/disaster recovery process
   - No cost monitoring for R2 storage

---

## Production Enhancement Recommendations

### High Priority

#### 1. Add Structured Logging

```typescript
import logger from "./logger";

// Replace console.log with:
logger.info("Upload started", { userId, fileType, fileSize });
logger.error("Upload failed", { error, userId, key });
```

#### 2. Implement Retry Logic

```typescript
import { retry } from "@aws-sdk/util-retry";

const uploader = new Upload({
  client: r2Client,
  params: {
    /* ... */
  },
  queueSize: 4,
  leavePartsOnError: false,
});
```

#### 3. Add Upload Progress Tracking

```typescript
uploader.on("httpUploadProgress", (progress) => {
  const percentage = (progress.loaded / progress.total) * 100;
  // Emit to client via WebSocket or Server-Sent Events
});
```

#### 4. Implement Orphaned File Cleanup Job

```typescript
// Daily cron job
// 1. Query all MediaFile records
// 2. List all R2 objects
// 3. Find objects not in database
// 4. Delete objects older than X days
```

#### 5. Add Metrics Collection

```typescript
import { Counter, Histogram } from "prom-client";

const uploadDuration = new Histogram({
  name: "r2_upload_duration_seconds",
  help: "R2 upload duration",
  labelNames: ["file_type", "status"],
});
```

### Medium Priority

#### 6. Stream Large Files (Avoid Memory Buffer)

```typescript
// For files > 100MB, stream directly to R2
if (fileSize > 100 * 1024 * 1024) {
  // Use streaming upload instead of buffer
}
```

#### 7. Parallel Upload (Thumbnail + Video)

```typescript
const [thumbnailResult, videoResult] = await Promise.all([
  uploadToR2(thumbnailFile, "thumbnail"),
  uploadToR2(videoFile, "video"),
]);
```

#### 8. Idempotency Keys

```typescript
// Check if movie with same title/hash already exists
const existingMovie = await findDuplicate(title, fileHash);
if (existingMovie) {
  return existingMovie; // Skip upload, return existing
}
```

#### 9. Rate Limiting

```typescript
import rateLimit from "express-rate-limit";

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 uploads per IP
  message: "Too many uploads, please try again later",
});

router.post("/upload", uploadLimiter /* ... */);
```

#### 10. Cost Monitoring

```typescript
// Track storage usage and operations
// Log file sizes, bandwidth, API calls
// Alert on unexpected cost spikes
```

### Low Priority

#### 11. Presigned URLs for Client-Side Upload

```typescript
// For future improvement: let clients upload directly
// Reduces server load, faster uploads
// Requires webhook handling for completion
```

#### 12. CDN Integration

```typescript
// Add Cloudflare CDN in front of R2
// Cache thumbnails and popular videos
// Reduce R2 bandwidth costs
```

#### 13. Multi-Region Replication

```typescript
// Replicate critical files across regions
// Improved availability and latency
// Requires R2 replication setup
```

---

## Performance Characteristics

### Upload Performance

| File Size        | Expected Time (100 Mbps) | Memory Usage |
| ---------------- | ------------------------ | ------------ |
| 5 MB (thumbnail) | ~0.5 seconds             | ~5 MB        |
| 500 MB (video)   | ~40 seconds              | ~500 MB      |
| 2 GB (video max) | ~160 seconds             | ~2 GB        |

**Bottlenecks:**

1. Memory buffering for large files
2. Sequential thumbnail → video upload
3. Network bandwidth to R2
4. Database transaction time

### Cost Considerations

**Cloudflare R2 Pricing (as of 2024):**

- Storage: $0.015 per GB/month
- Class A operations (write): $4.50 per million
- Class B operations (read): $0.36 per million
- Egress: FREE (major advantage)

**Example Monthly Costs:**

- 1 TB storage: $15
- 10,000 uploads: $0.045 (Class A)
- 1 million video streams: $0.36 (Class B)
- **Total: ~$15.41/month for 1TB + 1M streams**

**Cost Optimization:**

- Delete old/unused videos
- Compress videos before upload
- Use CDN caching to reduce Class B operations
- Monitor and alert on unusual usage

---

## Monitoring Checklist

### Application Metrics

- [ ] Upload success/failure rate
- [ ] Average upload duration by file size
- [ ] Memory usage during uploads
- [ ] Concurrent upload count
- [ ] Queue depth (if queue added)

### R2 Metrics

- [ ] Total storage used
- [ ] Class A operations per day
- [ ] Class B operations per day
- [ ] Failed request rate
- [ ] Average latency

### Business Metrics

- [ ] Videos uploaded per day
- [ ] Total video count
- [ ] Average video size
- [ ] Most popular videos (for caching)
- [ ] Storage cost trend

---

## Disaster Recovery

### Backup Strategy

1. **Database backups:** Daily snapshots of movie metadata
2. **R2 versioning:** Enable object versioning in bucket settings
3. **Cross-bucket replication:** Replicate to second bucket (optional)
4. **Export catalog:** Regular export of file keys for recovery

### Recovery Procedures

#### Scenario 1: Corrupted File in R2

1. Check R2 versioning for previous version
2. If available, restore previous version
3. If not, mark video as unavailable in database
4. Notify admin for re-upload

#### Scenario 2: Database Loss

1. Restore from latest database backup
2. Compare MediaFile records with R2 bucket listing
3. Identify orphaned files (in R2 but not in DB)
4. Option A: Delete orphaned files
5. Option B: Attempt to reconstruct metadata from file naming

#### Scenario 3: R2 Bucket Deleted

1. If replication enabled: promote replica to primary
2. If not: restore from backups (if configured)
3. If no backups: data loss (unrecoverable)
4. **Prevention:** Enable R2 bucket deletion protection

#### Scenario 4: Credential Compromise

1. Immediately revoke compromised API token
2. Create new API token
3. Update environment variables
4. Restart application
5. Audit recent API activity for unauthorized access
6. Check for unexpected files in bucket

---

## Migration Guide (Existing Local Files → R2)

If you have existing movies stored on local disk, use this migration strategy:

### Migration Script Template

```typescript
// src/scripts/migrate-to-r2.ts
import { AppDataSource } from "../db/database";
import { MediaFile } from "../entities/MediaFile";
import { uploadToR2 } from "../services/r2.service";
import fs from "fs/promises";
import path from "path";

async function migrateLocalFilesToR2() {
  await AppDataSource.initialize();

  const mediaRepo = AppDataSource.getRepository(MediaFile);
  const localFiles = await mediaRepo.find({
    where: { url: Like("uploads/%") }, // Find local paths
  });

  console.log(`Found ${localFiles.length} files to migrate`);

  for (const mediaFile of localFiles) {
    try {
      // Read local file
      const filePath = path.join(process.cwd(), mediaFile.url);
      const fileBuffer = await fs.readFile(filePath);

      // Create mock Multer file object
      const mockFile = {
        buffer: fileBuffer,
        mimetype: mediaFile.type === "thumbnail" ? "image/jpeg" : "video/mp4",
      } as Express.Multer.File;

      // Upload to R2
      const result = await uploadToR2(
        mockFile,
        mediaFile.type as "thumbnail" | "video",
      );

      // Update database
      mediaFile.url = result.key;
      await mediaRepo.save(mediaFile);

      // Optional: Delete local file
      await fs.unlink(filePath);

      console.log(`✓ Migrated: ${mediaFile.id}`);
    } catch (error) {
      console.error(`✗ Failed: ${mediaFile.id}`, error);
    }
  }

  console.log("Migration complete");
  process.exit(0);
}

migrateLocalFilesToR2();
```

### Migration Steps

1. **Backup everything** (database + local files)
2. Test migration on staging environment
3. Run migration during low-traffic period
4. Verify random sample of migrated files
5. Monitor for playback errors
6. Keep local files for 1-2 weeks before deletion
7. Update backup procedures to include R2

---

## Testing Strategy

### Unit Tests

```typescript
describe("R2 Service", () => {
  it("should upload file and return key", async () => {
    const mockFile = { buffer: Buffer.from("test"), mimetype: "image/jpeg" };
    const result = await uploadToR2(mockFile, "thumbnail");
    expect(result.key).toMatch(/^movies\/.*\/thumbnail\.jpeg$/);
  });

  it("should cleanup files on upload failure", async () => {
    // Mock R2 failure, verify deleteFromR2 is called
  });
});
```

### Integration Tests

```typescript
describe("Movie Upload Flow", () => {
  it("should upload movie with files to R2", async () => {
    const response = await request(app)
      .post("/admin/upload")
      .set("Authorization", `Bearer ${adminToken}`)
      .attach("thumbnail", "test/fixtures/thumb.jpg")
      .attach("video", "test/fixtures/movie.mp4")
      .field("title", "Test Movie")
      .field("category_id", testCategoryId)
      .field("duration_seconds", "120")
      .field("release_year", "2024");

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("success");

    // Verify files exist in R2
    // Verify database records
  });
});
```

### Load Testing

```bash
# Use Apache Bench or k6
k6 run --vus 10 --duration 60s upload-test.js
```

---

## Troubleshooting Guide

### Issue: "R2_ACCOUNT_ID is required"

**Cause:** Missing environment variable  
**Solution:** Check `.env` file, ensure all R2\_\* variables are set

### Issue: Upload fails with timeout

**Cause:** Large file + slow network  
**Solution:** Increase timeout in r2.service.ts, consider streaming upload

### Issue: "Failed to cleanup thumbnail"

**Cause:** Network error during cleanup after DB failure  
**Solution:** Run orphaned file cleanup script, check R2 connectivity

### Issue: High memory usage

**Cause:** Multiple concurrent large file uploads  
**Solution:** Implement upload queue, switch to streaming for large files

### Issue: "Invalid credentials"

**Cause:** Wrong R2_ACCESS_KEY_ID or R2_SECRET_ACCESS_KEY  
**Solution:** Verify credentials in Cloudflare dashboard, regenerate if needed

### Issue: Files uploaded but not appearing

**Cause:** Wrong bucket name or endpoint  
**Solution:** Verify R2_BUCKET matches actual bucket name

### Issue: Playback fails after upload

**Cause:** R2 bucket is private, public URL not working  
**Solution:** Either make bucket public or implement presigned URL generation

---

## Summary

### What We Built

- Cloud-based file storage with Cloudflare R2
- Memory-efficient upload pipeline
- Automatic error cleanup
- Flexible URL generation

### Production-Ready Features

✅ Basic functionality  
✅ Error handling  
✅ File validation  
✅ Cleanup on failure

### Needs Before Production

⚠️ Enhanced monitoring  
⚠️ Retry logic  
⚠️ Structured logging  
⚠️ Orphaned file cleanup  
⚠️ Security hardening

### Estimated Timeline to Production-Ready

- **Basic improvements:** 2-3 days
- **Full production hardening:** 1-2 weeks
- **Monitoring + observability:** 3-5 days

---

## References

- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [AWS S3 SDK for JavaScript v3](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/)
- [Multer Documentation](https://github.com/expressjs/multer)
- [TypeORM Documentation](https://typeorm.io/)

---

**Document Version:** 1.0  
**Last Updated:** March 3, 2026  
**Author:** Development Team  
**Status:** Implementation Complete, Production Enhancements Recommended
