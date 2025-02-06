import Link from "next/link";
import { BlogSidebar } from "../../components/blog-sidebar";

export default function BlogPage() {
  const pages: number[] = [2, 3, 4];

  return (
    <div>
      {/* Page Header */}
      <div className=" h-[286px] bg-[#F6F5FF] flex items-center py-16">
        <div className="container md:w-[1170px] mx-auto px-4">
          <h1 className="text-3xl text-center text-[#151875] md:text-left font-bold mb-4">Blog Page</h1>
          <div className="flex justify-center text-[#151875] md:justify-start items-center gap-2 text-sm">
            <Link href="/">Home</Link>
            <span>•</span>
            <Link href="/pages">Pages</Link>
            <span>•</span>
            <span className="text-[#FB2E86]">Blog Page</span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="container md:w-[1170px]  mx-auto px-4 py-16">
        <div className=" md:flex  gap-8">
          {/* Blog Posts */}
          <div className="md:col-span-2 space-y-8">
            
              <article className=" lg:w-[870px] space-y-4">
                <img
                  src={'/images/blog-page-1.png'}
                  alt=""
                  className="w-full rounded-lg"
                />
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="bg-pink-100 text-pink-500 px-4 py-1 ">Surf Auxion</span>
                  <span className="bg-pink-100 text-pink-500 px-4 py-1 ">Aug 09 2020</span>
                </div>
                <h2 className="text-2xl font-bold text-[#151875]">
                  Mauris at orci non vulputate diam tincidunt nec.
                </h2>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit facilisis quis auctor pretium ipsum, eu rutrum. Condimentum eu malesuada vitae ultrices in in neque, porta dignissim. Adipiscing purus, cursus vulputate id id dictum at.
                </p>
                <Link
                  href="/blog/post-1"
                  className="inline-block text-[#151875] hover:text-[#FB2E86] font-semibold hover:underline"
                >
                  Read More
                </Link>
              </article>

              <article className=" lg:w-[870px] space-y-4">
                <img
                  src={'/images/blog-page-2.png'}
                  alt=""
                  className="w-full rounded-lg"
                />
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="bg-pink-100 text-pink-500 px-4 py-1 ">Surf Auxion</span>
                  <span className="bg-pink-100 text-pink-500 px-4 py-1 ">Aug 09 2020</span>
                </div>
                <h2 className="text-2xl font-bold text-[#151875]">
                Aenean vitae in aliquam ultrices lectus. Etiam.
                </h2>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit facilisis quis auctor pretium ipsum, eu rutrum. Condimentum eu malesuada vitae ultrices in in neque, porta dignissim. Adipiscing purus, cursus vulputate id id dictum at.
                </p>
                <Link
                  href="/blog/post-1"
                  className="inline-block text-[#151875] hover:text-[#FB2E86] font-semibold hover:underline"
                >
                  Read More
                </Link>
              </article>

              <article className=" lg:w-[870px] space-y-4">
                <img
                  src={'/images/blog-page-3.png'}
                  alt=""
                  className="w-full rounded-lg"
                />
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="bg-pink-100 text-pink-500 px-4 py-1 ">Surf Auxion</span>
                  <span className="bg-pink-100 text-pink-500 px-4 py-1 ">Aug 09 2020</span>
                </div>
                <h2 className="text-2xl font-bold text-[#151875]">
                Sit nam congue feugiat nisl, mauris amet nisi. 
                </h2>
                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit facilisis quis auctor pretium ipsum, eu rutrum. Condimentum eu malesuada vitae ultrices in in neque, porta dignissim. Adipiscing purus, cursus vulputate id id dictum at.
                </p>
                <Link
                  href="/blog/post-1"
                  className="inline-block text-[#151875] hover:text-[#FB2E86] font-semibold hover:underline"
                >
                  Read More
                </Link>
              </article>

            {/* Pagination */}
            <div className="flex justify-center gap-2 pt-8">
              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FB2E86] text-white">
                1
              </span>
              {pages.map((page) => (
                <span
                  key={page}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
                >
                  {page}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-[250px]">
            <BlogSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
