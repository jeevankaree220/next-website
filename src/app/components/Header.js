export default function Header() {
    return (
      <header className="">
        <nav className="mx-auto h-20 flex items-center justify-between rounded-b-[60px] bg-stone-50 border border-stone-200 px-4 lg:px-8">
          <div className="flex items-center space-x-4">
            <span className="text-4xl font-extrabold">F</span>
            <span className="w-auto text-center ml-4 text-sm font-medium bg-stone-50 rounded-md px-4 py-2">Technology</span>
            <span className="w-20 text-center ml-4 text-sm font-medium bg-stone-50 rounded-md px-4 py-2">Pricing</span>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="w-20 text-center text-sm font-medium mr-4 bg-stone-50 rounded-md px-4 py-2">About</a>
            <a href="#" className="w-20 text-center text-sm font-medium mr-4 bg-stone-50 rounded-md px-4 py-2">Blog</a>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium">
              View Demo
            </button>
          </div>
        </nav>
      </header>
    );
  }