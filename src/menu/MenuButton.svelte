<script>
  export let tab;
  export let selected;
</script>

<div class={selected ? 'selected' : ''}>{tab}</div>

<style>
  div {
    font-weight: 400;
    color: rgb(34, 34, 34);
    text-align: center;
    padding: 10px 20px;
    box-sizing: border-box;
    cursor: pointer;
    height: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  div:hover {
    color: #039be5;
  }

  .selected {
    border-bottom: 2px solid rgb(3, 155, 229);
    color: #039be5;
    font-weight: bold;
  }
</style>
