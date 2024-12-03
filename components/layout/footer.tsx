import { getMenu } from 'lib/shopify';

const { SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : '');
  const skeleton = 'w-full h-6 animate-pulse rounded bg-neutral-200';
  const menu = await getMenu('next-js-frontend-footer-menu');
  const copyrightName = SITE_NAME || '';

  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-screen-2xl items-center justify-between p-[1rem_1rem_0.5rem] px-4 md:p-4 lg:px-6 overflow-hidden">
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap justify-center gap-x-12 gap-y-3 text-sm/6"
        >
          {menu.map((item) => (
            <a key={item.title} href={item.path} className="text-white hover:text-white">
              {item.title}
            </a>
          ))}
        </nav>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-20 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-md/10 font-semibold text-white">Subscribe to our newsletter</h3>
            <p className="text-md/5 mt-2 text-gray-300">
              The latest news, articles, and resources, sent to your inbox weekly.
            </p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email-address"
              type="email"
              required
              placeholder="Enter your email"
              autoComplete="email"
              className="w-full min-w-0 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:w-56 sm:text-sm/6"
            />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      <p className="align-center mt-2 flex justify-center bg-white p-4 text-sm/6 text-[#666666] md:order-1 md:mt-0">
        &copy; {copyrightDate} {copyrightName}. All rights reserved.
      </p>
    </footer>
  );
}
