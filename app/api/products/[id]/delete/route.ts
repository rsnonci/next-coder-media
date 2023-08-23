import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { Product } from "@prisma/client";
const prisma = new PrismaClient();

export const PUT = async (request: Request, {params}: {params: {id: string}}) =>{
    const product = await prisma.product.update({
        where:{
            id: Number(params.id)
        },
        data:{
            deletedAt: new Date()
        }
    });
    return NextResponse.json(product, {status: 200});
}