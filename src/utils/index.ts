const customFetch = async (url: string, options: RequestInit = {}, refreshTheToken?: (refreshToken: string) => void) => {

  const response = await fetch(url, options);
  console.log('response.status', response.status)
  if (response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      const result = await refreshTheToken?.(refreshToken);

      console.log('refreshToken', refreshToken)
      console.log('resudasdslt', result)
      const token = (result as any)?.token;
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
        return fetch(url, options);
      }
    }
  }
  return response;
};

export { customFetch }