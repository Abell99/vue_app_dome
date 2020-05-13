<template>
  <div>
    <ul>
      <li style="list-style-type:none" v-for="item in msg" :key="item.id">
        <div id="item.id">
          <img :class="item.id==activeA? 'open': ''" @click="onpenA(item.id)" :src="item.next? 'https://cfan.cc/tc/static/img/tree.png' : 'https://cfan.cc/tc/static/img/file.png'" alt="节点的图标" width="20px" height="20px">
          <span>{{ item.title }}</span>
          <ul v-if="item.next" v-show="activeA==item.id">
              <li style="list-style-type:none" v-for="item in item.next" :key="item.id">
                <div id="item.id">
                  <img :class="item.id==activeB? 'open': ''" @click="onpenB(item.id)" :src="item.next? 'https://cfan.cc/tc/static/img/tree.png' : 'https://cfan.cc/tc/static/img/file.png'" alt="非叶节点的图标" width="20px" height="20px">
                  <span>{{ item.title }}</span>
                  <ul v-if="item.next" v-show="activeB==item.id" >
                      <li style="list-style-type:none" v-for="item in item.next" :key="item.id">
                        <div id="item.id">
                          <img :src="item.next? 'https://cfan.cc/tc/static/img/tree.png' : 'https://cfan.cc/tc/static/img/file.png'" alt="非叶节点的图标" width="20px" height="20px">
                          <span>{{ item.title }}</span>
                        </div>
                      </li>
                  </ul>
                </div>
              </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: [],
      // 根据三个节点的id值判断，谁展开
      activeA: 'a-1',
      activeB: 'b-1'
    }
  },
  created () {
    // 获取列表
    this.getMsg()
  },
  methods: {
    async getMsg () {
      const { data: res } = await this.$http.get('https://cfan.cc/tc/?mod=vue&act=getdata&uid=4065&token=21893ec7e1f3cb497116092e0b9e0e84')
      console.log(res)
      this.msg = res.msg
    },
    onpenA (A) {
      console.log(1111)
      this.activeA = A
    },
    onpenB (B) {
      this.activeB = B
    }
  }
}
</script>

<style scoped lang="less">
  .open {
    transform:rotate(90deg);
    transition: all 1s;
  }
</style>
