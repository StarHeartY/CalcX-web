import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother)

export { gsap, ScrollSmoother, ScrollTrigger, useGSAP }
