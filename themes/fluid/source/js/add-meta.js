const addMeta = (name, content) => {
    //手动添加mate标签
    const meta = document.createElement("meta");
    meta.name = name;
    meta.content = content;
    const doc = document.head || document.documentElement;
    doc.appendChild(meta);
}

const metaList = [
    //360搜索
    {
        name: "360-site-verification",
        content: "804e8c69b12968ff0dd9ea24bc7e1b09"
    },
    //神马搜索
    {
        name: "shenma-site-verification",
        content: "3cadf7ba9040be727cdb97e1db54d14c_1690559102"
    },
    //搜狗搜索
    {
        name: "sogou_site_verification",
        content: "Ohh2EYAOMB"
    }
]

for(const metaItem of metaList) {

    addMeta(metaItem.name, metaItem.content);

}
