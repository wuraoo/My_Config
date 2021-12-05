import Instance from "./http";

// 登录
export const loginSubmit = params => Instance.post2("/api/user/login", params);
// 退出
export const logout = params => Instance.post2("/api/user/logout", params);

// 获取所有学科列表
export const getCourses = params => Instance.get("/api/course/findAll",params);
// 新增学科
export const addCourse = params => Instance.post2("/api/course/add",params);

