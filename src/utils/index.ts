const customFetch = async (url: string, options: RequestInit = {}, refreshTheToken: (refreshToken: string) => Promise<{ token: string, refreshToken: string }>, setToken: (token: string) => void) => {

  const response = await fetch(url, options);
  if (response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (refreshToken) {
      const result = await refreshTheToken(refreshToken);

      if (result) {
        const token = (result as any).token;
        setToken(token)
        localStorage.setItem("refreshToken", result.refreshToken);
  
        if (token) {
          options.headers = {
            ...options.headers,
            Authorization: `Bearer ${token}`,
          };
          return fetch(url, options);
        }
      }
    }
  }
  return response;
};

export { customFetch }