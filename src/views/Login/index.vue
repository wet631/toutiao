<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
      >
        <template #left-icon>
          <ToutianIcon icon="shouji"></ToutianIcon>
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        type="number"
        :maxlength="6"
      >
        <template #left-icon>
          <ToutianIcon icon="yanzhengma"></ToutianIcon>
        </template>

        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="5000"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            native-type="button"
            class="send-sms-btn"
            type="primary"
            size="small"
            @click="sendSmscode"
            :loading="isDisabled"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// value自动从表单里面获取的值
// 获取到的值是对象 key>> 表单的name值 value>>用户输入的值
// 只有在promise成功了的情况下才会继续执行
// ref获取表单或者标签
import { login, getSmsCode } from "@/api/user";
import { Toast } from "vant";
export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      user: {
        mobile: "13911111112",
        code: "246810",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号输入不正确",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码只能6位",
          },
        ],
      },
      isCountDownShow: false,
      isDisabled: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit(values) {
      try {
        const res = await login(values);
        console.log(res);
        Toast.success("登录成功");
      } catch (e) {
        Toast.fail(e?.response?.data?.message || "服务器错误");
      }
    },
    // 不同的错误进行不同的处理
    async sendSmscode() {
      try {
        await this.$refs.form.validate("mobile");
        console.log("发送验证码中");
      } catch (e) {
        console.log(e);
        return;
      }
      try {
        this.isDisabled = true;
        /*
        如果接口请求速度很慢
        接口获取到结果之前，按钮可以一直点击
        */
        // 展示倒计时

        // 调用验证码接口
        await getSmsCode(this.user.mobile);
        this.isCountDownShow = true;
        // 成功以后进行提示
        this.$toast.success("发送验证码成功");
      } catch (e) {
        // 失败后进行错误的提示
        console.log(e);
        this.$toast.fail(e.response.data.message || "出错了");
        this.isCountDownShow = false;
      } finally {
        this.isDisabled = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 156px;
    height: 46px;
    line-height: 45px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
}
</style>
