import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            name,
            description,
            price,
            type,
            gender,
            images,
            categoryId,
            brandId,
            frameShape,
            frameMaterial,
            color,
        } = body;

        // Validation
        if(!name || !price || !type || !gender) {
            return new NextResponse("Missing required fields", {status: 400});
        }

        // Get or create default category if not provided
        let finalCategoryId = categoryId;
        if (!finalCategoryId) {
            const defaultCategory = await prisma.category.findFirst({
                where: { name: "Glasses" }
            });
            
            if (defaultCategory) {
                finalCategoryId = defaultCategory.id;
            } else {
                // Create default category if it doesn't exist
                const newCategory = await prisma.category.create({
                    data: { name: "Glasses" }
                });
                finalCategoryId = newCategory.id;
            }
        }

        // Get or create default brand if not provided
        let finalBrandId = brandId;
        if (!finalBrandId) {
            const defaultBrand = await prisma.brand.findFirst({
                where: { name: "Ray-Ban" }
            });
            
            if (defaultBrand) {
                finalBrandId = defaultBrand.id;
            } else {
                // Create default brand if it doesn't exist
                const newBrand = await prisma.brand.create({
                    data: { name: "Ray-Ban" }
                });
                finalBrandId = newBrand.id;
            }
        }

        // Verify that categoryId and brandId exist
        const categoryExists = await prisma.category.findUnique({
            where: { id: finalCategoryId }
        });
        
        const brandExists = await prisma.brand.findUnique({
            where: { id: finalBrandId }
        });

        if (!categoryExists) {
            return new NextResponse(`Category with id ${finalCategoryId} does not exist`, {status: 400});
        }

        if (!brandExists) {
            return new NextResponse(`Brand with id ${finalBrandId} does not exist`, {status: 400});
        }

        // Convert images array from [{ url: string }] to string[] (Prisma format)
        const imageUrls = images && Array.isArray(images) 
            ? images.map((img: any) => typeof img === 'string' ? img : img.url).filter(Boolean)
            : [];

        // Create Product in Database
        const product = await prisma.product.create({
            data: {
                name,
                description: description || "",
                price: parseFloat(price),
                type,
                gender,
                images: imageUrls,
                frameShape: frameShape || "Universal",
                frameMaterial: frameMaterial || "Plastic",
                color: color || "Black",
                categoryId: finalCategoryId,
                brandId: finalBrandId,
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error: any) {
        console.error("[PRODUCTS_POST]", error);
        
        // Return more detailed error message
        const errorMessage = error?.message || "Internal Error";
        const errorCode = error?.code || "UNKNOWN_ERROR";
        
        return new NextResponse(
            JSON.stringify({ 
                error: errorMessage, 
                code: errorCode,
                details: process.env.NODE_ENV === "development" ? error : undefined
            }), 
            { 
                status: 500,
                headers: { "Content-Type": "application/json" }
            }
        );
    }
}