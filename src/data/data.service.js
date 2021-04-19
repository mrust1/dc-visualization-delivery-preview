import { writable } from 'svelte/store';
import { cdService } from "./cd.service.js";
import { visService } from "./vis.service.js";
export let mainContent = writable({});
export let secondaryContent = writable({});
export let connected = writable(false);
let unsubscribe;
visService.connect().then((e)=>{if(e===true){
  connected.set(true);
}});

export const visData = async () => {
  unsubscribe = visService.listenForChanges((change)=>{
    mainContent.set(change);
  });
  console.log('unsub method', unsubscribe);
  return await visService.fetchContent()
}

export const loadData = async (live) => {
  let val;
  try {
    val = await cdService.fetchContent(live);
    return val;
  } catch (e) {

    try {
      val = JSON.parse(e.message);
    } catch (b) {
      val = {
        error: {
          message: e.message
        },
      };
    }
    return val;
  }
};

export async function setLive() {
  if(unsubscribe) {
    unsubscribe();
  }
  mainContent.set(await loadData(true));
}

export async function setStaged() {
  if(unsubscribe) {
    unsubscribe();
  }
  mainContent.set(await loadData());
}

export async function setRealtime() {
  if(unsubscribe) {
    unsubscribe();
  }
  mainContent.set(await visData());
}

export async function setDiff() {
  if(unsubscribe) {
    unsubscribe();
  }
  mainContent.set(await loadData())
  secondaryContent.set(await loadData(true));
}