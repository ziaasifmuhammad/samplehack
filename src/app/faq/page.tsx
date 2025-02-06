"use client"

import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { FAQItem } from "../../components/ui/faq-item"
import { BrandLogos } from "../../components/ui/brand-logos"

const faqs = [
  {
    question: "Eu dictumst cum at sed euismood condimentum?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed tristique mollis vitae, consequat gravida sagittis.",
  },
  {
    question: "Magna bibendum est fermentum eros.",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed tristique mollis vitae, consequat gravida sagittis.",
  },
  {
    question: "Odio muskana hak eris conseekin scelerton?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed tristique mollis vitae, consequat gravida sagittis.",
  },
  {
    question: "Elit id blandit sabara boi velit gua mara?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt sed tristique mollis vitae, consequat gravida sagittis.",
  },
]

export default function FAQPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
  }

  return (
    <div>
      {/* Page Header */}
      <div className=" h-[286px] bg-[#F6F5FF] flex items-center py-16">
        <div className="container md:w-[1170px] mx-auto px-4">
          <h1 className="text-3xl text-center text-[#151875] md:text-left font-bold mb-4">FAQ</h1>
          <div className="flex justify-center text-[#151875] md:justify-start items-center gap-2 text-sm">
            <Link href="/">Home</Link>
            <span>•</span>
            <Link href="/pages">Pages</Link>
            <span>•</span>
            <span className="text-[#FB2E86]">FAQ</span>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container  mt-12 md:mt-24 md:w-[1170px] mx-auto px-4 py-16">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* General Information */}
          <div>
            <h2 className="text-2xl font-bold text-[#151875] mb-8">
              General Information
            </h2>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <FAQItem key={index} {...faq} />
              ))}
            </div>
          </div>

          {/* Ask a Question */}
          <div
          className="bg-[#F6F5FF]  rounded-2xl p-6 py-12">
            <h2 className="text-2xl  font-bold text-[#151875] mb-8">
              Ask a Question
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input placeholder="Your Name*" required className="bg-white border rounded-[4px] border-gray-400" />
              <Input placeholder="Subject*" required className="bg-white border rounded-[4px] border-gray-400" />
              <Textarea
                placeholder="Type Your Message*"
                required
                className="min-h-[150px] bg-white border rounded-[4px] border-gray-400"
              />
              <Button
                type="submit"
                className="bg-[#FB2E86] px-12 text-white rounded-[4px] hover:bg-[#FB2E86]/90"
              >
                Send Mail
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Brand Logos */}
      <BrandLogos />
    </div>
  )
}

