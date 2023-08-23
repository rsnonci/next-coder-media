import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Product } from "@prisma/client";
const prisma = new PrismaClient();

export const POST = async (request: Request) =>{
    try {
        const body: Product = await request.json();
        let error = []

        if (!body.title || body.title == '') {
            error.push('Please fill product name field')
        }

        if (!body.price || body.price == 0) {
            error.push('Please fill price field')
        }

        if (!body.brandId || body.brandId == 0) {
            error.push('Please fill brand field')
        }

        if (error.length > 0) {
            return NextResponse.json({error}, {status: 400});
        }
        
        const product = await prisma.product.create({
            data:{
                title: body.title,
                price: body.price,
                brandId: body.brandId
            }
        });
        return NextResponse.json(product, {status: 201});
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}