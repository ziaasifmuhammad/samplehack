import Link from "next/link"
import { BlogSidebar } from "../../../components/blog-sidebar"
import { Star } from "lucide-react"
import { BrandLogos } from "../../../components/ui/brand-logos"
export default function SingleBlogPage() {
  return (
    <div>
      {/* Page Header */}
      <div className=" h-[286px] bg-[#F6F5FF] flex items-center py-16">
        <div className="container md:w-[1170px] mx-auto px-4">
          <h1 className="text-3xl text-center text-[#151875] md:text-left font-bold mb-4">Single Blog</h1>
          <div className="flex justify-center text-[#151875] md:justify-start items-center gap-2 text-sm">
            <Link href="/">Home</Link>
            <span>•</span>
            <Link href="/product-page">Pages</Link>
            <span>•</span>
            <span className="text-[#FB2E86]">Single Blog</span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container md:w-[1177px] mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            <article className="space-y-6">
              <img
                src="/images/blog-page-1.png"
                alt=""
                className="w-full rounded-lg"
              />
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="bg-pink-100 text-pink-500 px-4 py-1 ">Surf Auxion</span>
                <span className="bg-pink-100 text-pink-500 px-4 py-1 ">Aug 09 2020</span>
              </div>
              <h1 className="text-3xl font-bold text-[#151875]">
                Mauris at orci non vulputate diam tincidunt nec.
              </h1>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit facilisis quis auctor pretium ipsum, eu rutrum. Condimentum eu malesuada vitae ultrices in in neque, porta dignissim.
              </p>
              <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit dapibus est, nunc, montes, lacus consequat integer viverra. Sit morbi etiam quam rhoncus. Velit in arcu platea donec vitae ante posuere malesuada.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit dapibus est, nunc, montes, lacus consequat integer viverra. Sit morbi etiam quam rhoncus. </p>

              <p className="text-gray-600 leading-8 px-2 border-l-2 mb-6 border-pink-500 py-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit dapibus est, nunc, montes, lacus consequat integer viverra. Sit morbi etiam quam rhoncus. Velit in arcu platea donec vitae ante posuere malesuada.Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
              <div className="grid grid-cols-2 py-6 gap-4">
                <img
                  src="/images/b-slug-1.png"
                  alt=""
                  className="w-full rounded-lg"
                />
                <img
                  src="/images/b-slug-2.png"
                  alt=""
                  className="w-full rounded-lg"
                />
              </div>

              <p className="text-gray-600  mb-12 mt-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit facilisis quis auctor pretium ipsum, eu rutrum. Condimentum eu malesuada vitae ultrices in in neque, porta dignissim. Adipiscing purus, cursus vulputate id id dictum at.Condimentum eu malesuada vitae ultrices in in neque, porta dignissim. Adipiscing purus, cursus vulputate id id dictum at. Adipiscing purus, cursus vulputate id id dictum at.cursus vulputate id id dictum at.
              
              </p>

              <div className="grid grid-cols-2 gap-y-[100px] md:gap-y-0 md:grid-cols-4 gap-4">
                <div >
                <img
                  src="/images/slug-1.png"
                  alt=""
                  className="w-full h-full aspect-square rounded-lg"
                />
                <div className="mt-4">
                  <h1 className="ml-4 font-semibold">Quem Sed</h1>
                </div>
                <div className="flex text-sm gap-2 mt-2">
                  <h3 className="text-[#151875]">$32.00</h3>
                  <h4 className="text-pink-500 hidden md:block line-through">$56.00</h4>
                  <div className="flex items-center gap-1 ">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3  ${i < 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                </div>
                </div>
                <div >
                <img
                  src="/images/slug-2.png"
                  alt=""
                  className="w-full h-full aspect-square rounded-lg"
                />
                <div className="mt-4">
                  <h1 className="ml-4 font-semibold">Quem Sed</h1>
                </div>
                <div className="flex text-sm gap-2 mt-2">
                  <h3 className="text-[#151875]">$32.00</h3>
                  <h4 className="text-pink-500 hidden md:block  line-through">$56.00</h4>
                  <div className="flex items-center gap-1 ">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3  ${i < 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                </div>
                </div>
                

                <div >
                <img
                  src="/images/slug-3.png"
                  alt=""
                  className="w-full h-full aspect-square rounded-lg"
                />
                <div className="mt-4">
                  <h1 className="ml-4 font-semibold">Quem Sed</h1>
                </div>
                <div className="flex text-sm gap-2 mt-2">
                  <h3 className="text-[#151875]">$32.00</h3>
                  <h4 className="text-pink-500 hidden md:block  line-through">$56.00</h4>
                  <div className="flex items-center gap-1 ">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3  ${i < 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                </div>
                </div>


                <div >
                <img
                  src="/images/slug-4.png"
                  alt=""
                  className="w-full h-full aspect-square rounded-lg"
                />
                <div className="mt-4">
                  <h1 className="ml-4 font-semibold">Quem Sed</h1>
                </div>
                <div className="flex text-sm gap-2 mt-2">
                  <h3 className="text-[#151875]">$32.00</h3>
                  <h4 className="text-pink-500 hidden md:block  line-through">$56.00</h4>
                  <div className="flex items-center gap-1 ">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3  ${i < 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                            }`}
                        />
                      ))}
                    </div>
                </div>
                </div>

              </div>
              <div className="pt-24">
              <p className="text-gray-600 ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit facilisis quis auctor pretium ipsum, eu rutrum. Condimentum eu malesuada vitae ultrices in in neque, porta dignissim. Adipiscing purus, cursus vulputate id id dictum at.Condimentum eu malesuada vitae ultrices in in neque, porta dignissim. Adipiscing purus, cursus vulputate id id dictum at. Adipiscing purus, cursus vulputate id id dictum at.cursus vulputate id id dictum at.
              </p>

              <p className="text-gray-600 my-12 ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit facilisis quis auctor pretium ipsum, eu rutrum. Condimentum eu malesuada vitae ultrices in in neque, porta dignissim. Adipiscing purus, cursus vulputate id id dictum at.Condimentum eu malesuada vitae ultrices in in neque, porta dignissim. Adipiscing purus, cursus vulputate id id dictum at. Adipiscing purus, cursus vulputate id id dictum at.cursus vulputate id id dictum at.
              </p>
              </div>

                <hr/>


                        {/* Follow */}
      
        <div className="flex justify-center my-4 gap-2">
          <a href="#" className="w-8 h-8 rounded-full bg-purple-700 font-semibold text-white flex items-center justify-center">f</a>
          <a href="#" className="w-8 h-8 rounded-full bg-[#FB2E86] text-white flex items-center justify-center">in</a>
          <a href="#" className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center">X</a>
        </div>
      


               <div className="bg-gray-100 flex py-1 px-4 justify-between text-gray-400">
                  <p> ← Previous Post</p>
                  <p> Next Post ➝</p>
                </div>             

              {/* Comments */}
              <div className="space-y-6 md:py-24 pt-8">
               
                {[1, 2].map((comment) => (
                  <div key={comment} className="flex  items-center p-4 border-2 shadow-md border-gray-300 gap-4">
                    <img
                      src="/images/comment-1.png"
                      alt=""
                      className="w-24 h-24 "
                    />
                    <div>
                      <div className="flex my-0 py-0 gap-x-20">
                      <h3 className="font-bold text-[#151875]">Sapien ac</h3>
                      <p className="text-sm text-gray-500">Aug 09 2020</p>
                      </div>
                      <p className=" py-0 my-0 text-gray-400 md:leading-8">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit facilisis quis auctor pretium ipsum.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Form */}
              <form className="space-y-4  pt-8">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name*"
                    className="p-2 border border-gray-400 rounded"
                  />
                  <input
                    type="email"
                    placeholder="Write Your Email*"
                    className="p-2 border border-gray-400 rounded"
                  />
                </div>
                <textarea
                  placeholder="Write your comment*"
                  rows={6}
                  className="w-full p-2 border border-gray-400 rounded"
                ></textarea>
                <button className="w-full py-2 bg-[#FB2E86] text-white rounded">
                  Continue Shipping
                </button>
              </form>
            </article>

            
          </div>

          {/* Sidebar */}
          <aside>
            <BlogSidebar />
          </aside>
        </div>
        <div className="md:pt-[100px]">
        <BrandLogos/>
        </div>
      </div>
    </div>
  )
}

