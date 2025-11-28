"use client"

import { Button } from "@mui/material"
import Link from "next/link"
import { useTranslate } from "src/locales/use-locales"
import { paths } from "src/routes/paths"

export const SignInButton = () => {

    const { t } = useTranslate()
    return (
        <Link href={paths.auth.signIn}>
            <Button
                variant={'contained'}
                sx={{
                    display: 'inline-flex',
                    borderRadius: '9999px',
                }}
            >
                {t('landing.hero.buttons.signIn')}
            </Button>
        </Link>
    )
}