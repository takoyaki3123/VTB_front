import API from '@/_libs/api';

let apiInstance: ReturnType<typeof API> | null = null;
const useAPI = () => {
  const path = 'http://localhost:8000/api/';
  if (!apiInstance) {
    apiInstance = API(path, {
      onError: (error) => {
        console.log(error);
      },
    });
  }
  return apiInstance;
};
export default useAPI;
