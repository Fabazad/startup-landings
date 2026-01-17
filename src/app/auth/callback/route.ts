import { NextResponse } from 'next/server'
import { getServerWishListQuery } from 'src/app/envy-old/queries/wishList/server'
import { createSupabase } from 'src/lib/supabase-server'
import { paths } from 'src/routes/paths'
import { getServerNotificationSettingsQueries } from 'src/app/envy-old/queries/notificationSettings/server'


export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')

    if (code) {
        const supabase = await createSupabase()

        // This exchanges the auth code for the user session
        // and sets the session as a cookie automatically.
        const { error, data } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            const forwardedHost = request.headers.get('x-forwarded-host') // Load balancer support
            const isLocalEnv = process.env.NODE_ENV === 'development'

            const serverClientWishListQuery = await getServerWishListQuery()
            const res = await serverClientWishListQuery.hasWishList(data.user.id)
            const next = res.success && !res.hasWishList ? paths.envy.wishList.create : paths.envy.root

            const notificationSettingsQueries = await getServerNotificationSettingsQueries()
            await notificationSettingsQueries.addIfMissing(data.user.id)

            if (isLocalEnv) {
                // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        }
    }

    // If there is an error or no code, redirect to an error page
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}