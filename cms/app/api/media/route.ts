import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/admin";
import { prisma } from "@/lib/prisma";

const maxUploadBytes = 10 * 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "application/pdf"]);

function configureCloudinary() {
  const { CLOUDINARY_CLOUD_NAME: cloud_name, CLOUDINARY_API_KEY: api_key, CLOUDINARY_API_SECRET: api_secret } = process.env;
  if (!cloud_name || !api_key || !api_secret) throw new Error("Cloudinary is not configured.");
  cloudinary.config({ cloud_name, api_key, api_secret });
}

export async function POST(request: Request) {
  await requireAdmin();
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
  if (!allowedTypes.has(file.type)) return NextResponse.json({ error: "Use a JPG, PNG, WebP, GIF, or PDF file." }, { status: 415 });
  if (file.size > maxUploadBytes) return NextResponse.json({ error: "Files must be 10 MB or smaller." }, { status: 413 });

  try {
    configureCloudinary();
    const dataUri = `data:${file.type};base64,${Buffer.from(await file.arrayBuffer()).toString("base64")}`;
    const asset = await cloudinary.uploader.upload(dataUri, { folder: "comsoc", resource_type: "auto" });
    const record = await prisma.mediaAsset.create({
      data: {
        publicId: asset.public_id,
        url: asset.secure_url,
        resourceType: asset.resource_type,
        format: asset.format,
        bytes: asset.bytes,
        width: asset.width,
        height: asset.height,
      },
    });
    return NextResponse.json(record, { status: 201 });
  } catch (error) {
    console.error("Cloudinary upload failed", error);
    return NextResponse.json({ error: "Upload failed. Check Cloudinary and database configuration." }, { status: 500 });
  }
}
