import axios from "axios";
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

// TYPES
import { EHttpMethod } from "@/types/enums/HttpMethod";
import type { IParams } from "@/types/services/params";
import { getAccessTokenCs, getRefreshTokenCs, setAccessToken } from "@/utils/storage";

/**
 * The HttpService class is a service that provides a layer of abstraction over the axios
 * library for making HTTP requests. It handles the common tasks of setting up headers,
 * injecting interceptors, and normalizing errors. This allows the application code to
 * focus on making requests without having to worry about the underlying details.
 *
 * @author Valentin magde <valentinmagde@gmail.com>
 * @since 2026-02-22
 *
 * class HttpService
 */
class HttpService {
  private http: AxiosInstance;
  private baseURL = import.meta.env.VITE_APP_API_BASE_URL;
  private retry: boolean = false;
  private lang: string = "en";

  /**
   * The constructor of the HttpService class is called when a new instance of the class is created.
   * It initializes the http property to an instance of the axios library, with the baseURL,
   * withCredentials, and headers properties set to their respective values.
   *
   * @author Valentin magde <valentinmagde@gmail.com>
   * @since 2024-01-20
   */
  constructor() {
    this.http = axios.create({
      baseURL: this.baseURL,
      withCredentials: false,
      headers: this.setupHeaders(),
    });
  }

  /**
   * The getAuthorization() method is a private method that gets the authorization
   * token from the Cookies object.The method first checks if the AccessToken cookie is set.
   * If the cookie is set, the method returns an object with the Authorization header set to
   * the value of the AccessToken cookie. If the cookie is not set, the method returns an empty object.
   *
   * @author Valentin magde <valentinmagde@gmail.com>
   * @since 2024-01-20
   *
   * @returns {any} An object with the Authorization header or an empty object.
   */
  private get getAuthorization(): any {
    const accessToken = getAccessTokenCs();
    return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  }

  /**
   * The service() method is a public method that initializes the service configuration by injecting
   * the interceptors. The method returns the HttpService instance itself, so that it can be chained
   * with other methods.
   *
   * @author Valentin magde <valentinmagde@gmail.com>
   * @since 2024-01-20
   *
   * @returns {HttpService} the HttpService instance.
   */
  public service(): HttpService {
    this.injectInterceptors();

    return this;
  }

  /**
   * The setupHeaders() method is a private method that sets up the request headers.
   *
   * @author Valentin magde <valentinmagde@gmail.com>
   * @since 2024-01-20
   *
   * @param {Boolean} hasAttachment An argument which indicates whether or not the request has an attachment.
   *
   * @returns {any} An object of content type and authorization.
   */
  private setupHeaders(hasAttachment = false): any {
    return hasAttachment
      ? { "Content-Type": "multipart/form-data", ...this.getAuthorization }
      : { "Content-Type": "application/json", ...this.getAuthorization };
  }

  /**
   * The request() method is a private method that makes an HTTP request to the specified URL.
   * The method takes three arguments
   *
   * @author Valentin magde <valentinmagde@gmail.com>
   * @since 2024-01-20
   *
   * @param {EHttpMethod} method The HTTP method to use, such as GET, POST, PUT, or DELETE.
   * @param {string} url The URL to make the request to.
   * @param {AxiosRequestConfig} options An object that contains additional options for the request, such as headers,
   * data, and params.
   *
   * @returns {Promise<T>} An http response or an error object promise.
   */
  private async request<T>(
    method: EHttpMethod,
    url: string,
    options: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.http.request<T>({
        method,
        url,
        ...options,
      });

      return response.data;
    } catch (error) {
      return this.normalizeError(error);
    }
  }

  /**
   * The get() method is a public method that performs a GET request to the specified URL.
   * The method takes three arguments
   *
   * @author Valentin magde <valentinmagde@gmail.com>
   * @since 2024-01-20
   *
   * @param {string} url The URL to make the request to.
   * @param {IParams} params An object that contains the parameters for the request.
   * @param {Boolean} hasAttachment A boolean value that indicates whether or not the request has an attachment.
   *
   * @returns {Promise<T>} The response data from the request.
   */
  public async get<T>(
    url: string,
    params?: IParams,
    hasAttachment = false
  ): Promise<T> {
    return this.request<T>(EHttpMethod.GET, url, {
      params,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  /**
   * The post() method is a public method that performs a POST request to the specified URL.
   * The method takes four arguments.
   *
   * @author Valentin magde <valentinmagde@gmail.com>
   * @since 2024-01-20
   *
   * @param {string} url  The URL to make the request to.
   * @param {P} payload The payload to send with the request.
   * @param {IParams} params An object that contains the parameters for the request.
   * @param {Boolean} hasAttachment A boolean value that indicates whether or not the request has an attachment.
   *
   * @returns {Promise<T>} The response data from the request.
   */
  public async post<T, P>(
    url: string,
    payload: P,
    params?: IParams,
    hasAttachment = false
  ): Promise<T> {
    return this.request<T>(EHttpMethod.POST, url, {
      params,
      data: payload,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  /**
   * The put() method is a public method that performs a PUT request to the specified URL.
   * The method takes four arguments.
   *
   * @author Valentin magde <valentinmagde@gmail.com>
   * @since 2024-01-20
   *
   * @param {string} url The URL to make the request to.
   * @param {P} payload The payload to send with the request.
   * @param {IParams} params An object that contains the parameters for the request.
   * @param {Boolean} hasAttachment A boolean value that indicates whether or not the request has an attachment.
   *
   * @returns {Promise<T>} The response data from the request.
   */
  public async put<T, P>(
    url: string,
    payload: P,
    params?: IParams,
    hasAttachment = false
  ): Promise<T> {
    return this.request<T>(EHttpMethod.PUT, url, {
      params,
      data: payload,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  /**
   * The patch() method is a public method that performs a PATCH request to the specified URL.
   * The method takes four arguments.
   *
   * @author Valentin magde <valentinmagde@gmail.com>
   * @since 2024-01-20
   *
   * @param {string} url The URL to make the request to.
   * @param {P} payload The payload to send with the request.
   * @param {IParams} params An object that contains the parameters for the request.
   * @param {Boolean} hasAttachment A boolean value that indicates whether or not the request has an attachment.
   *
   * @returns {Promise<T>} The response data from the request.
   */
  public async patch<T, P>(
    url: string,
    payload: P,
    params?: IParams,
    hasAttachment = false
  ): Promise<T> {
    return this.request<T>(EHttpMethod.PATCH, url, {
      params,
      data: payload,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  /**
   * The delete() method is a public method that performs a DELETE request to the specified URL.
   * The method takes three arguments
   *
   * @author Valentin magde <valentinmagde@gmail.com>
   * @since 2024-01-20
   *
   * @param {string} url The URL to make the request to.
   * @param {IParams} params An object that contains the parameters for the request.
   * @param {Boolean} hasAttachment A boolean value that indicates whether or not the request has an attachment.
   *
   * @returns {Promise<T>} The response data from the request.
   */
  public async delete<T>(
    url: string,
    params?: IParams,
    hasAttachment = false
  ): Promise<T> {
    return this.request<T>(EHttpMethod.DELETE, url, {
      params,
      headers: this.setupHeaders(hasAttachment),
    });
  }

  /**
   * The injectInterceptors() method is a private method that sets up the request and response interceptors.
   * The method first sets up the request interceptor, which is called before every request is made.
   * The method then sets up the response interceptor, which is called after every response is received.
   *
   * The request interceptor can be used to perform tasks such as setting up headers, injecting cookies,
   * and checking for authentication. The response interceptor can be used to perform tasks such as handling errors,
   * logging responses, and caching data.
   *
   * @author Valentin magde <valentinmagde@gmail.com>
   * @since 2024-01-20
   *
   * @returns {void}
   */
  private injectInterceptors(): void {
    // Clear existing interceptors
    // if(this.http.interceptors.request.handlers.length) {
    //   this.clearInterceptors();
    // }
    this.clearInterceptors();

    // Set up request interceptor
    this.http.interceptors.request.use((request) => {
      // * Perform an action
      // TODO: implement an NProgress
      return request;
    });

    // Set up response interceptor
    this.http.interceptors.response.use(
      (response) => {
        console.log(response);
        // * Do something
        return response;
      },

      async (error) => {
        // * Implement a global error alert
        if (
          error.response &&
          error.response.status === 401 &&
          !this.retry &&
          getAccessTokenCs()
        ) {
          const originalRequest = error.config;

          this.retry = true;

          // authService.refreshToken();
          await axios
            .post(
              `${this.baseURL}/${this.lang}/auth/refresh`,
              { refreshToken: getRefreshTokenCs() },
              { headers: this.setupHeaders() }
            )
            .then((response: any) =>
              setAccessToken(response.data.data.accessToken)
            ).catch(() => {
              // modalService.trigger("Votre session a expiré");
            });

          // Set original request header
          originalRequest.headers = this.setupHeaders();

          // Retry the original request
          return this.http(originalRequest);
        }

        return Promise.reject(error);
      }
    );
  }

  /**
   * The clearInterceptors method is a private method in the HttpService class that clears
   * all the interceptors that have been added to the http instance.
   *
   * @author Valentin magde <valentinmagde@gmail.com>
   * @since 2024-03-25
   *
   * @return {void}
   */
  private clearInterceptors(): void {
    this.http.interceptors.request.clear();
    this.http.interceptors.response.clear();
  }

  /**
   * The normalizeError() method is a private method that normalizes errors by returning a
   * Promise that rejects with the error object. This method can be overridden in subclasses
   * to provide custom error handling.
   *
   * @author Valentin magde <valentinmagde@gmail.com>
   * @since 2024-01-20
   *
   * @param {any} error The error object.
   *
   * @returns {Promise<any>} A promise that rejects with the error object.
   */
  private normalizeError(error: any): Promise<any> {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      let err = error.response.data.message || error.response.data.error;

      if (!err) err = JSON.stringify(error.response);
      else if (typeof err == "object")
        err = Object.values(err)
          .map((val) => val)
          .toString();

      return Promise.reject(err);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an
      // instance of
      // http.ClientRequest in node.js
      if (error.code === "ERR_NETWORK") {
        // Handle network error
        return Promise.reject(`
          ${error.message},
          ${error.config.baseURL} server is down
        `);
      }
    } else {
      // Something happened in setting up the request that triggered an Error
      return Promise.reject(error?.message || JSON.stringify(error));
    }

    return Promise.reject(error.response?.data || error);
  }
}

export { HttpService as default };
