import { NextResponse } from "next/server";
import { scrapUrl } from "src/lib/scrappers";
import { benchmarkScrapper } from "src/lib/scrappers/all/benchmark";
import { z } from "zod";

const scrapUrlSchema = z.object({
    url: z.string().min(1, 'URL is required'),
});

export const POST = async (request: Request) => {
    const body = await request.json();
    const validatedBody = scrapUrlSchema.safeParse(body);
    if (!validatedBody.success) {
        return NextResponse.json(
            { error: 'Validation failed', details: validatedBody.error.errors },
            { status: 400 }
        );
    }
    const { url } = validatedBody.data;

    const data = await scrapUrl(url);

    return NextResponse.json(data);
}

export const PUT = async (request: Request) => {
    const body = await request.json();
    const validatedBody = scrapUrlSchema.safeParse(body);
    if (!validatedBody.success) {
        return NextResponse.json(
            { error: 'Validation failed', details: validatedBody.error.errors },
            { status: 400 }
        );
    }
    const { url } = validatedBody.data;

    const data = await benchmarkScrapper(url);

    return NextResponse.json(data);
}