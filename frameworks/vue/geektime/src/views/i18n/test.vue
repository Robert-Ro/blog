<template>
  <div class="user-wrapper">{{ JSON.stringify(handleLogout) }}</div>
</template>

<script>
const md5 = (str) => str
const commonEnum = {
  rule: {
    userPassword: /a/,
  },
}
export default {
  name: 'UserMenu',

  components: {},
  computed: {
    // ...mapGetters(['nickname', 'avatar', 'userInfo', 'isAutel']),
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value === '' || value === undefined || value === null) {
        return callback(new Error(this.$t('form.text46')))
      } else if (!value.match(commonEnum.rule.userPassword)) {
        return callback(
          new Error(
            this.$t('length-from-min-to-max-with-letter-digit', {
              min: 8,
              max: 25,
            })
          )
        )
      } else if (this.passwordAgain === '' || this.passwordAgain === undefined || this.passwordAgain === null) {
        return callback(new Error(this.$t('form.text48')))
      } else if (value !== this.passwordAgain) {
        return callback(new Error(this.$t('two-passwords-are-not-the-same')))
      } else {
        callback()
      }
    }
    return {
      resetPwdVisible: false,
      form: {
        oldPassword: '',
        newPassword: '',
      },
      passwordAgain: '',
      rules: {
        newPassword: [{ validator: validatePassword }],
      },
      saveParam: {
        password: null,
      },
      loading: false,
      count: 0,
    }
  },
  methods: {
    handleLogout() {
      this.$confirm({
        icon: () => <IconAlert style="font-size:22px; margin-right: 16px;position: relative;top: -3px;" />,
        title: this.$t('newAdd.text76'),
        content: this.$t('newAdd.text75'),
        onOk: () => {
          this.$store.dispatch('logout')
        },
      })
    },
    editPassword() {
      this.resetPwdVisible = true
      if (this.$refs.form) {
        this.$refs.form.resetFields()
      }
    },
    resetPwd() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.resetPassword()
        } else {
          this.$message.error(this.$t('Mistaken-input-please-check'))
        }
      })
    },
    resetPassword() {
      this.loading = true
      this.$http({
        url: 'saasAccessAppApi.password',
        method: 'put',
        data: {
          // 2代表MD5加密，涉及前端调用后台有关密码的接口，全部用MD5加密后再传
          isEncryption: 2,
          oldPassword: md5(this.form.oldPassword),
          newPassword: md5(this.form.newPassword),
        },
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message.success(this.$t('newAdd.text66'))
            this.resetPwdVisible = false
          } else {
            this.$message.error(res.message)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
