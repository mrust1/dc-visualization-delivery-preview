<script>
  export let type = '';
  export let title = '';
</script>

<div>
  <span>{type}:</span> {title} 
  <svg xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 0 24 24" width="1rem" fill="#666"><path d="M24 24H0V0h24v24z" fill="none" opacity=".87"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/></svg>
</div>

<style>
  span {
    color: #888;
  }
  div {
    display: grid;
    place-content: center;
    border: 1px solid #ccc;
    background: #ddd;
    color: #666;
    font-weight: bold;
    cursor: pointer;
    padding:0.25rem 0;
    border-radius: 0.5rem;
    text-align: center;
    font-size: 0.75rem;
    gap: 0.25rem;
    grid-template-areas: ". . .";
    transition: all 0.5s;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji
  }
  div:hover {
    background: #eee;
    border: 1px solid #aaa;
    color: #555
  }
</style>