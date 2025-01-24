class CommentApp {
    constructor() {
        this.container = document.getElementById("app");  // This now finds the div with id="app"
        this.db = [
            { id: 1, text: "Nice post", parentId: null },
            { id: 2, text: "Nice post again", parentId: null },
            { id: 3, text: "reply to 1", parentId: 1 },
        ];
        this.renderUI();
    }

    getCommentsByParentId(parentId) {
        return this.db.filter((e) => e.parentId === parentId);
    }

    renderUIRecursive(parentId = null, fragment) {
        const comments = this.getCommentsByParentId(parentId);
        for (const comment of comments) {
            const div = document.createElement("div");
            div.classList.add("reply-container");

            div.style.marginLeft = "20px";
            div.style.borderLeft = "2px solid black";
            div.style.padding = "10px";

            const p = document.createElement("p");
            const btn = document.createElement("button");

            p.innerText = comment.text;
            btn.innerText = `Reply to ${comment.text}`;

            btn.addEventListener('click', () => {
                const reply = prompt(`Reply to ${comment.text}`);
                this.db.push({ id: Date.now(), text: reply, parentId: comment.id });
                this.renderUI();
            });

            div.appendChild(p);
            div.appendChild(btn);

            let renderChildrenFragment = document.createDocumentFragment();
            renderChildrenFragment = this.renderUIRecursive(
                comment.id,
                renderChildrenFragment
            );

            div.appendChild(renderChildrenFragment);

            fragment.appendChild(div);
        }
        return fragment;
    }

    renderUI() {
        let fragment = document.createDocumentFragment();
        fragment = this.renderUIRecursive(null, fragment);

        this.container.innerHTML = "";
        this.container.appendChild(fragment);
    }
}

new CommentApp();
