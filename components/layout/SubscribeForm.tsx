'use client';

import { Fragment, useActionState, useEffect, useState } from 'react';
import { createSubscription } from './subscription-action';

const initialState = {
  message: '',
  success: false
};

export const SubscribeForm = () => {
  const [state, formAction, pending] = useActionState(createSubscription, initialState);

  const [isMessageDisplayed, setIsMessageDisplayed] = useState(false);
  useEffect(() => {
    if (state?.success) {
      setIsMessageDisplayed(true);
      const timer = setTimeout(() => {
        setIsMessageDisplayed(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state]);
  return (
    <Fragment>
      <form action={formAction} className="mt-6 sm:flex sm:max-w-md lg:mt-0">
        <div className="w-full">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            autoComplete="email"
            className="w-full min-w-0 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:w-56 sm:text-sm/6"
          />

          {state?.success === false && <div className="text-red">{state.message}</div>}

          {isMessageDisplayed && (
            <p className="text-l mt-2 font-bold text-white">{state.message}</p>
          )}
        </div>

        <div className="mt-4 sm:ml-4 sm:mt-0 sm:shrink-0">
          <button
            type="submit"
            disabled={pending}
            className="flex w-full items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-black shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Subscribe
          </button>
        </div>
      </form>
    </Fragment>
  );
};
