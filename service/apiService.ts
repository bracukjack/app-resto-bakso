import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "@/model/user";

class ApiService {
  private static async getToken() {
    try {
      const token = await AsyncStorage.getItem("authToken");
      return token || null;
    } catch (error) {
      console.error("Error fetching token from AsyncStorage:", error);
      return null;
    }
  }

  private static async apiRequest(url: string, requestInit: RequestInit) {
    url = process.env.EXPO_PUBLIC_API_URL + url;

    try {
      const res = await fetch(url, requestInit);
      const data = await res.json();

      const response = {
        status: res.status,
        data,
      };

      return response;
    } catch (error) {
      console.error("API Request Error:", error);
      throw new Error("Network error or server unreachable.");
    }
  }

  private static async withAuthHeaders(headers: HeadersInit = {}) {
    const token = await this.getToken();
    if (token) {
      return { ...headers, Authorization: `Bearer ${token}` };
    }
    return headers;
  }

  static async get(url: string) {
    const token = await AsyncStorage.getItem("token");
    const req = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };
  
    return this.apiRequest(url, req);
  }

  static async post(url: string, data: {}, isMultiPart = false) {
    const headers = isMultiPart
      ? { "Content-Type": "multipart/form-data" }
      : await this.withAuthHeaders({
          "Content-Type": "application/json",
        });

    const req = {
      method: "POST",
      body: JSON.stringify(data),
      headers,
    };

    return this.apiRequest(url, req);
  }


  static async put(url: string, data: {}, token: string) {
    const req = {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return this.apiRequest(url, req);
  }

  static async delete(url: string) {
    const headers = await this.withAuthHeaders({
      "Content-Type": "application/json",
    });

    const req = {
      method: "DELETE",
      headers,
    };

    return this.apiRequest(url, req);
  }

  static async postFormData(url: string, data: FormData) {
    const headers = await this.withAuthHeaders({
      "Content-Type": "multipart/form-data",
    });

    const req = {
      method: "POST",
      body: data,
      headers,
    };

    return this.apiRequest(url, req);
  }

  static async checkLoginStatus() {
    const headers = await this.withAuthHeaders({
      "Content-Type": "application/json",
    });

    const req = {
      method: "GET",
      headers,
    };

    return this.apiRequest("/auth/status", req);
  }

  static async register(data: User) {
    const req = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    return this.apiRequest("/register-pembeli", req); // assuming this is your register endpoint
  }

  static async login(data: { email: string; password: string }) {
    const req = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await this.apiRequest("/login-pembeli", req);
    if (response.status === 200) {
      const { token } = response.data;
      await AsyncStorage.setItem("authToken", token); // Save token to AsyncStorage
    }
    return response;
  }

  static async logout() {
    await AsyncStorage.removeItem("authToken"); // Remove token from AsyncStorage
    console.log("User logged out.");
  }
}

export default ApiService;
