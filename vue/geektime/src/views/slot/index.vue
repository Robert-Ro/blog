<template>
  <SlotDemo
    :vnodeTitle="getVnodeTitle()"
    :vnodeDefault="getVnodeDefault()"
    :vnodeScopedItem="getItem()"
    :name="'Slot Demo'"
    :onChange="handleChange"
  />
</template>

<script>
import SlotDemo from "./slot.vue";

export default {
  components: {
    SlotDemo,
  },
  data() {
    return {
      vnodeTitle: [
        {
          render: (h) => h("span", "111"),
        },
      ],
    };
  },
  methods: {
    handleChange(title) {
      console.log(title);
    },
    getVnodeTitle() {
      return [
        this.$createElement("p", "title slot1"),
        this.$createElement("p", "title slot2"),
      ];
    },
    getVnodeDefault() {
      return [this.$createElement("p", "slot default")];
    },
    getItem() {
      return (props) => [
        this.$createElement("p", `item slot-item: ${JSON.stringify(props)}`),
      ];
    },
  },
};
</script>

<style></style>
