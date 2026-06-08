import Config from "./config";

const BASE_API_URL = Config.baseURL;

type Query = Record<string, string>;
type Headers = Record<string, string>;

type Options<TREQ> = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  query?: Query;
  headers?: Headers;
  body?: TREQ;
}

type Response<TRES> = {
  ok: boolean;
  status: number;
  body: TRES | null;
  errors: any | null;
}

export default class satherApiClient {
  private base_url = BASE_API_URL;
  private onError?: (error: any) => void;
  
//   // Concurrency locks for token refreshing
//   private isRefreshing = false;
//   private refreshQueue: ((success: boolean) => void)[] = [];

  constructor(onError?: (error: any) => void) {
    this.onError = onError;
  }

  /**
   * The public wrapper that handles interceptors (like 401 Token Refreshing)
   */
  async request<TREQ, TRES>(options: Options<TREQ>): Promise<Response<TRES>> {
    let response = await this.requestInternal<TREQ, TRES>(options);
    // return response
    // Intercept 401 Unauthorized errors
    // if (response.status === 401 && options.url !== '/auth/refresh' && options.url !== '/login') {
      
      // If a refresh is already in progress, queue this request
    //   if (this.isRefreshing) {
    //     const refreshSuccess = await new Promise<boolean>((resolve) => {
    //       this.refreshQueue.push(resolve);
    //     });
        
    //     // If the queued refresh succeeded, replay the original request
    //     if (refreshSuccess) {
    //       return await this.requestInternal<TREQ, TRES>(options);
    //     }
    //     return response; // Refresh failed, return the original 401
    //   }

      // Lock the queue and attempt a refresh
    //   this.isRefreshing = true;
    //   const refreshResponse = await this.requestInternal<null, null>({
    //     method: 'POST',
    //     url: '/auth/refresh' // Adjust to your backend's refresh route
    //   });

    //   const refreshSuccess = refreshResponse.ok;
    //   this.isRefreshing = false;

    //   // Resolve all queued requests with the result of the refresh
    //   this.refreshQueue.forEach((resolve) => resolve(refreshSuccess));
    //   this.refreshQueue = [];

      // Replay the original request if refresh was successful
    //   if (refreshSuccess) {
    //     return await this.requestInternal<TREQ, TRES>(options);
    //   } else {
    //     // If refresh fails, the user's session is entirely dead. 
    //     // Trigger a global logout or redirect to login here.
    //     if (this.onError) this.onError(new Error("Session Expired"));
    //   }
    // }

    if (response.status >= 500 && this.onError) {
      this.onError(response);
    }

    return response;
  }

  /**
   * The core fetch logic. Stripped of manual token handling.
   */
  private async requestInternal<TREQ, TRES>(options: Options<TREQ>): Promise<Response<TRES>> {
    let query = new URLSearchParams(options.query || {}).toString();
    if (query !== '') {
      query = '?' + query;
    }

    let response;
    try {
      response = await fetch(this.base_url + options.url + query, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        // allow_,
        // IMPORTANT: This tells the browser to automatically attach the 
        // HttpOnly cookie to the request. No manual tokens needed.
        credentials: 'include',
        body: options.body ? JSON.stringify(options.body) : null,
      });
    } catch (error: any) {
      return {
        ok: false,
        status: 500,
        body: null,
        errors: { message: 'The server is unresponsive', description: error.toString() }
      };
    }

    // Safely parse JSON
    let payload = null;
    if (response.status !== 204 && response.headers.get('content-type')?.includes('application/json')) {
      try {
        payload = await response.json();
      } catch (e) {
        payload = null;
      }
    }

    return {
      ok: response.ok,
      status: response.status,
      body: response.status < 400 ? payload : null,
      errors: response.status >= 400 ? (payload?.errors || payload) : null,
    };
  }

  async get<TRES>(url: string, query?: Query, options?: Omit<Options<null>, 'method' | 'url' | 'query'>): Promise<Response<TRES>> {
    return this.request<null, TRES>({ method: 'GET', url, query, ...options });
  }

  async post<TREQ, TRES>(url: string, body?: TREQ, options?: Omit<Options<TREQ>, 'method' | 'url' | 'body'>): Promise<Response<TRES>> {
    return this.request<TREQ, TRES>({ method: 'POST', url, body, ...options });
  }

  async put<TREQ, TRES>(url: string, body?: TREQ, options?: Omit<Options<TREQ>, 'method' | 'url' | 'body'>): Promise<Response<TRES>> {
    return this.request<TREQ, TRES>({ method: 'PUT', url, body, ...options });
  }

  async delete<TRES>(url: string, options?: Omit<Options<null>, 'method' | 'url'>): Promise<Response<TRES>> {
    return this.request<null, TRES>({ method: 'DELETE', url, ...options });
  }

  /**
   * Auth Methods
   */
  async login(email: string, password: string): Promise<'ok' | 'fail' | 'error'> {
    // We send credentials in the body now, not in a Basic Auth header, 
    // which is more standard for JSON APIs.
    const response = await this.post<{email: string, password: string}, null>('/login', {
      email,
      password
    });

    if (!response.ok) {
      return response.status === 401 || response.status === 400 ? 'fail' : 'error';
    }
    
    // No localStorage setting here. The backend's Set-Cookie header handled it.
    return 'ok';
  }

  async logout(): Promise<void> {
    // Calling the backend to clear the HttpOnly cookie
    await this.post('/logout');
  }
}