export async function login({ username, password }) {
  try {
    const formBody = new URLSearchParams();
    formBody.append("username", username);
    formBody.append("password", password);

    const res = await fetch("/api/proxy/sipp-karhutla/api_v2/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formBody.toString(),
    });

    const json = await res.json();
    console.log("DATA LOGIN:", json);

    const token = json.data?.token;
    const user = json.data?.user;

    return {
      success: res.ok,
      token,
      user,
    };
  } catch (error) {
    return { success: false, error: "Tidak dapat terhubung ke server." };
  }
}