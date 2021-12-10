## 验证码的使用

详情可参考开源项目：https://gitee.com/ele-admin/EasyCaptcha

### 使用

**依赖**

```xml
<!--验证码-->
<dependency>
    <groupId>com.github.whvcse</groupId>
    <artifactId>easy-captcha</artifactId>
    <version>1.6.2</version>
</dependency>
```

**工具类**

VerCodeUtil.java

**使用案例**

```java
@ApiOperation("验证验证码"
@PostMapping("check/vercode")
public Result checkVerCode(@RequestBody Map<String,String> map){
    // 获取前端输入的验证码
    String verCode = map.get("vercode");
    // 获取缓存中的验证码，verCode根据业务设置唯一key
    String redisCode = (String) redisTemplate.opsForValue().get("verCode");
    if (verCode == null || redisCode == null || !verCode.equals(redisCode)){
        return Result.error().setMessage("验证码错误");
    }
    return Result.ok();
}

@ApiOperation("获取验证码")
@GetMapping("get/vercode")
public Result getVerCode(){
    // 使用工具类生成验证码结果
    Map<String, String> captcha = VerCodeUtil.getArithmeticCaptcha(130,48,4);
    // 将验证码存入redis并设置过期时间
    redisTemplate.opsForValue().set("verCode", captcha.get("verCode"), 5, TimeUnit.MINUTES);
    return Result.ok().setData("image", captcha.get("image"));
}
```

**前端（Vue）**

```vue
<template>
    <div id="image">
          <img :src="image" min-width="100" height="100" />
          <el-input
            id="verCodeText"
            v-model="verCode"
            placeholder="请输入结果"
          ></el-input>
     </div>
</template>

<script>
	export default {
        data() {
    		return {
                // 验证码图片
                image: "",
                // 用户输入的验证码
                verCode: "",
            }
        },
        methods:{
                // 获取验证码
                getVerCode() {
                  axios.get(`http://localhost:8001/get/vercode`).then(
                    (res) => {
                      if (res.data.code == 20000) {
                        this.image = res.data.data.image;
                      }
                    },
                    (error) => {
                      this.$message.error(error.response.data);
                    }
                  );
                },
                // 验证码检查
                checkVerCode() {
                  let param = {
                    vercode: this.verCode,
                  };
                  axios
                    .post(`http://localhost:8001/check/vercode`, param).then(
                      (res) => {
                        if(res.data.code == 20000){
                          // 验证成功操作
                        }else{
                          this.$message.error(res.data.message)
                        }
                      },
                      (error) => {
                        this.$message.error(error.response.data)
                      }
                    );
                },
        }
    }
</script>
```

