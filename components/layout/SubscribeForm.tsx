export const SubscribeForm = () => {
  const createSubscription = async (formData: FormData) => {
    'use server';
    const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY;
    const LIST_ID = 'RQYR4h';
    const API_URL = `https://a.klaviyo.com/api/v2/list/${LIST_ID}/subscribe`;

    // Create the request body
    const payload = {
      profiles: [
        {
          email: formData.get('email-address')
        }
      ]
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message);
        return;
      }

      const responseData = await response.json();
      console.log('User subscribed successfully:', responseData);
      return responseData; // Handle the successful response here
    } catch (error) {
      console.error('Error subscribing user:', error);
      throw error; // Pass the error back to the caller
    }
  };

  return (
    <form action={createSubscription} className="mt-6 sm:flex sm:max-w-md lg:mt-0">
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
  );
};
