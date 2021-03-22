<template>
  <div :class="['card-input__box', { 'no-margin': noMargin }]">
    <label v-if="!hideLabel" :for="`card-input-${id}`">CARD {{ id+1 }}</label>
    <input
      :id="`card-input-${id}`"
      type="text"
      maxlength="3"
      @input="updateSelf($event.target.value)"
      @blur="validateSelf($event.target.value)"
    />
    <small v-if="showError">Invalid card</small>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Emit,
  Prop,
} from 'vue-property-decorator';

import { validateCard } from '@/helpers/card.helper';

@Component({
  components: {
  },
})
export default class CardInput extends Vue {
  @Prop({ required: true }) public id!: string;

  @Prop() public value!: string;

  @Prop({ type: Boolean, default: false }) public hideLabel!: boolean;

  @Prop({ type: Boolean, default: false }) public noMargin!: boolean;

  @Emit('input')
  updateSelf(value: string): string {
    return value.toUpperCase();
  }

  private showError = false;

  public validateSelf(value: string) {
    if (!value) return;
    this.showError = !validateCard(value);
  }
}
</script>

<style lang="scss" scoped>
  .card-input__box {
    display: flex;
    flex-direction: column;
    position: relative;
    width: calc((100% / 5) - (60px / 5));

    &.no-margin {
      input {
        margin: 0 !important;
      }

      small {
        bottom: -1rem;
      }
    }

    label {
      color: #B1B1B1;
      font-size: 0.75rem;
      margin-bottom: 0.25rem;
    }

    input {
      border: solid 1px #CED2E0;
      border-radius: 0.25rem;
      box-shadow: rgba(0, 0, 0, 0.1) 0 3px 10px;
      font-size: 0.75rem;
      margin-bottom: 1.5rem;
      padding: 0.75rem;
      text-transform: uppercase;
    }

    small {
      bottom: 0.5rem;
      color: red;
      font-size: 0.75rem;
      position: absolute;
    }
  }
</style>
