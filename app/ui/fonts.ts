import { Anton, Inter } from "next/font/google";

export const anton = Anton({
    subsets: ["latin"],
    variable: "--font-anton",
    weight: ['400', '400'],
})

export const inter = Inter({
    weight: ['100', '200', '300'],
    subsets: ["latin"],
    variable: "--font-inter",
})