import { writable } from 'svelte/store';
import { cdService } from "./cd.service.js";
import { visService } from "./vis.service.js";
export let mainContent = writable({});
export let secondaryContent = writable({});
let useVisConnection = false;
setTimeout(()=>{
  if(!useVisConnection){
    setStaged();
  }
}, 100);
visService.connect().then((e)=>{if(e===true){
  useVisConnection = true;
  setStaged();
  visService.listenForChanges((change)=>{
    mainContent.set(change);
  })
}});

export const loadData = async (live) => {
  let val;
  try {
    val = useVisConnection && !live ? await visService.fetchContent() : await cdService.fetchContent(live);
    return val;
  } catch (e) {

    try {
      val = JSON.parse(e.message);
    } catch (b) {
      val = {
        error: {
          message: e.message,
          params,
        },
      };
    }
    return val;
  }
};

export async function setLive() {
  mainContent.set(await loadData(true));
}

export async function setStaged() {
  mainContent.set(await loadData());
}

export async function setDiff() {
  mainContent.set(await loadData())
  secondaryContent.set(await loadData(true));
}