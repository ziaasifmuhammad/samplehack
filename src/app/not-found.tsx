import Link from "next/link"
import { Button } from "../components/ui/button"
import { BrandLogos } from "../components/ui/brand-logos"
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
       {/* Page Header */}
       <div className="h-[286px] bg-[#F6F5FF] flex items-center py-16">
          <div className="container md:w-[1177px] mx-auto px-4">
            <h1 className="text-3xl text-center text-[#151875] md:text-left font-bold mb-4">404 Not Found</h1>
            <div className="flex justify-center text-[#151875] md:justify-start items-center gap-2 text-sm">
              <Link href="/">Home</Link>
              <span>•</span>
              <Link href="/pages">Pages</Link>
              <span>•</span>
              <span className="text-[#FB2E86]">404 Not Found</span>
            </div>
          </div>
        </div>

        {/* 404 Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="md:w-[1177px] mx-auto text-center ">
            <img
              src="/images/not-found.png"
              alt="404 Illustration"
              className="mx-auto"
            />
           
            <Button 
              asChild
              className="bg-[#FB2E86] hover:bg-[#FB2E86]/90 text-white px-8 rounded"
            >
              <Link href="/">
                Back To Home
              </Link>
            </Button>
          </div>
        </div>

        <BrandLogos />
      </main>
    </div>
  )
}

