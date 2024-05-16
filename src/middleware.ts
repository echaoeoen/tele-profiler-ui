import { NextRequest, NextResponse } from "next/server";

const basicAuth = process.env.BASIC_AUTH || "YWRtaW46amFrYXJ0YTIwMjQ=";

export async function middleware(req: NextRequest, res: NextResponse) {
    // We need to create a response and hand it to the supabase client to be able to modify the response headers.
    const next = NextResponse.next;
    if(req.headers.get('authorization')?.split(' ')[1] === basicAuth) {
        return next();
    }
        return NextResponse.json({
            message: 'Unauthorized'
        }, {
            status: 401,
            headers: {
                ['WWW-Authenticate']: 'Basic realm="Secure Area"'
            }
        })
}

export const config = {
    matcher: '/:path*',
  }