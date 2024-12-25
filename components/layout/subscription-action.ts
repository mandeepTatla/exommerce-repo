'use server';

export async function createSubscription(prevState: any, formData: FormData) {
  const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY;
  const LIST_ID = 'RQYR4h';
  const API_URL = `https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs`;

  const email = formData.get('email') as string;

  const payload = {
    data: {
      type: 'profile-subscription-bulk-create-job',
      attributes: {
        profiles: {
          data: [
            {
              type: 'profile',
              attributes: {
                email,
                subscriptions: {
                  email: {
                    marketing: {
                      consent: 'SUBSCRIBED'
                    }
                  }
                }
              }
            }
          ]
        },
        historical_import: false
      },
      relationships: {
        list: {
          data: {
            type: 'list',
            id: LIST_ID
          }
        }
      }
    }
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
        revision: '2024-10-15',
        Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Error Response:', text || 'No response body');
      return { message: 'Failed to subscribe. Please try again.', success: false };
    }

    if (response.headers.get('content-length') === '0') {
      return { message: 'Thank you for signing up', success: true };
    }

    return { message: 'Thank you for signing up', success: true };
  } catch (error) {
    console.error('Unexpected Error:', error);
    return { message: 'Server error. Please try later.', success: false };
  }
}
