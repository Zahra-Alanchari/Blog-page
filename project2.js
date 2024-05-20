function loadingPage() {
  return fetch("data.json")
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error fetching the data:", error);
      throw error;
    });
}

loadingPage()
  .then((data) => {
    let contentOfTextarea = "";
    let mainBody = document.getElementById("main");

    data.comments.map((comments) => {
      const post = document.createElement("div");
      post.setAttribute("class", "post");

      const firstComment = document.createElement("div");
      firstComment.setAttribute("class", "firstComment");
      post.appendChild(firstComment);

      const profile = document.createElement("div");
      firstComment.appendChild(profile);
      profile.setAttribute("class", "profileSection");

      const image = document.createElement("img");
      image.src = comments.user.image.webp;
      image.setAttribute("class", "profilePic");
      profile.appendChild(image);

      const name = document.createElement("h5");
      name.innerHTML = comments.user.username;
      name.className = "name";
      profile.appendChild(name);

      if (name.innerHTML === "maxblagun") {
        firstComment.classList.add("maxblagun");
      } else if (name.innerHTML === "amyrobson") {
        firstComment.classList.add("amyrobson");
      }

      const date = document.createElement("span");
      date.innerHTML = comments.createdAt;
      profile.appendChild(date);

      const content = document.createElement("div");
      content.innerHTML = comments.content;
      content.className = "paragraph";

      firstComment.appendChild(content);

      const box = document.createElement("div");
      box.setAttribute("class", "box");
      firstComment.appendChild(box);

      const btn = document.createElement("div");
      btn.setAttribute("class", "btn");
      box.appendChild(btn);

      const plus = document.createElement("span");
      plus.innerHTML = `<img class="plus" src="./images/icon-plus.svg" alt="">`;

      const score = document.createElement("span");
      score.innerHTML = `${comments.score}`;
      score.setAttribute("class", "counter");

      const minus = document.createElement("span");
      minus.innerHTML = `<img class="minus" src="./images/icon-minus.svg" alt="">`;
      btn.appendChild(plus);
      btn.appendChild(score);
      btn.appendChild(minus);

      const reply = document.createElement("button");
      reply.innerHTML = `<img class="reply" src="./images/icon-reply.svg" alt="">reply`;
      box.appendChild(reply);
      reply.setAttribute("class", "replysection");
      reply.classList.add("repp");

      mainBody.appendChild(post);

      const replycommentItem = document.createElement("div");
      replycommentItem.setAttribute("class", "replycommentItem");
      comments.replies.map((repliesItem) => {
        const postReply = document.createElement("div");
        postReply.setAttribute("class", "postReply");
        replycommentItem.appendChild(postReply);
        post.appendChild(replycommentItem);

        const firstComment = document.createElement("div");
        firstComment.setAttribute("class", "firstComment");
        postReply.appendChild(firstComment);

        const profile = document.createElement("div");
        firstComment.appendChild(profile);
        profile.setAttribute("class", "profileSection");

        const image = document.createElement("img");
        image.src = repliesItem.user.image.webp;
        image.setAttribute("class", "profile");
        profile.appendChild(image);

        const name = document.createElement("h5");
        name.innerHTML = repliesItem.user.username;
        profile.appendChild(name);

        const date = document.createElement("span");
        date.innerHTML = repliesItem.createdAt;
        profile.appendChild(date);

        const content = document.createElement("div");
        content.innerHTML = repliesItem.content;
        content.className = "paragraph";
        firstComment.appendChild(content);

        if (name.innerHTML === "juliusomo") {
          const you = document.createElement("div");
          you.innerHTML = "you";
          you.className = "you";
          profile.appendChild(you);
          date.className = "days";
          content.classList.add("editParag");
          content.remove();
          firstComment.classList.add("juliusomo");
          const zahra = document.createElement("textarea");
          zahra.defaultValue = repliesItem.content;
          zahra.className = "paragraph";
          firstComment.appendChild(zahra);
          zahra.disabled = true; // Disable the textarea by default
          let editbtn = document.createElement("button");
          editbtn.innerHTML = `<h2>UPDATE</h2>`;
          editbtn.setAttribute("class", "hide confirmBtn");
          editbtn.style.display = "none";
          firstComment.appendChild(editbtn);
        }

        const box = document.createElement("div");
        box.setAttribute("class", "box");
        firstComment.appendChild(box);

        const btn = document.createElement("div");
        btn.setAttribute("class", "btn");
        box.appendChild(btn);

        const plus = document.createElement("span");
        plus.innerHTML = `<img class="plus" src="./images/icon-plus.svg" alt="">`;

        const score = document.createElement("span");
        score.innerHTML = `${repliesItem.score}`;
        score.setAttribute("class", "counter");

        const minus = document.createElement("span");
        minus.innerHTML = `<img class="minus" src="./images/icon-minus.svg" alt="">`;
        btn.appendChild(plus);
        btn.appendChild(score);
        btn.appendChild(minus);

        if (name.innerHTML === "juliusomo") {
          const deleteIcon = document.createElement("div");
          deleteIcon.innerHTML = `<img class="delete" src="./images/icon-delete.svg" alt="">Delete`;
          box.appendChild(deleteIcon);
          deleteIcon.setAttribute("class", "deleteIcon");

          const editIcon = document.createElement("div");
          editIcon.innerHTML = `<img class="edit" src="./images/icon-edit.svg" alt="">Edit`;
          box.appendChild(editIcon);
          editIcon.setAttribute("class", "editIcon");
        } else {
          const reply = document.createElement("div");
          reply.innerHTML = `<img class="replyToPost" src="./images/icon-reply.svg" alt="">reply`;
          box.appendChild(reply);
          reply.setAttribute("class", "replysection");
          reply.classList.add("replyIcon");
        }
      });
    });

    const plusToNumber = document.querySelectorAll(".plus");
    const minusToNumber = document.querySelectorAll(".minus");
    const replyToComment = document.querySelectorAll(".repp");
    const replyToPost = document.querySelectorAll(".replyIcon");

    plusToNumber.forEach((item) => {
      item.addEventListener("click", plusOne);

      function plusOne(event) {
        let scoreElement = item.parentNode.nextSibling;
        let currentScore = parseInt(scoreElement.innerHTML);
        scoreElement.innerHTML = ++currentScore;
        item.removeEventListener("click", plusOne);
      }
    });

    minusToNumber.forEach((item) => {
      item.addEventListener("click", minusOne);

      function minusOne(event) {
        let scoreElement = item.parentNode.previousSibling;
        let currentScore = parseInt(scoreElement.innerHTML);
        scoreElement.innerHTML = --currentScore;
        item.removeEventListener("click", minusOne);
      }
    });

    replyToComment.forEach((item) => {
      item.addEventListener("click", ReplyClick);

      function ReplyClick() {
        console.log("click");
        const replyComment = document.createElement("div");
        replyComment.className = "addDiv";
        const post = item.closest(".post");

        if (!post.querySelector(".addDiv")) {
          replyComment.innerHTML = `<img class="avatar" src="./images/avatars/image-juliusomo.webp" alt="">
                                <textarea name="text" class="textarea" cols="30" rows="10"></textarea>
                                <button class="replyButton">Reply</button>`;
          post.appendChild(replyComment);
          item.disabled = true;

          const textBox = replyComment.querySelector(".textarea");
          textBox.addEventListener(
            "change",
            (event) => (contentOfTextarea = event.target.value)
          );

          const saveReplyBtn = replyComment.querySelector(".replyButton");
          saveReplyBtn.addEventListener("click", () => {
            localStorage.setItem("content", contentOfTextarea);
            replyComment.remove();
            item.disabled = false;
          });
        }
      }
    });












    replyToPost.forEach((item) => {
      item.addEventListener("click", ReplyClick);
      // console.log(item , "kodom")

      function ReplyClick() {
        const replyComment = document.createElement("div");
        replyComment.className = "addDivreply";
        const post = item.closest(".postReply");

        if (!post.querySelector(".addDivreply")) {
          replyComment.innerHTML = `<img class="avatar" src="./images/avatars/image-juliusomo.webp" alt="">
                                <textarea name="text" class="replytextarea" cols="30" rows="10"></textarea>
                                <button class="replyButton">Reply</button>`;
          post.appendChild(replyComment);
          item.disabled = true;

          const textBox = replyComment.querySelector(".replytextarea");
          textBox.addEventListener(
            "change",
            (event) => (contentOfTextarea = event.target.value)
          );

          const saveReplyBtn = replyComment.querySelector(".replyButton");
          saveReplyBtn.addEventListener("click", () => {
            localStorage.setItem("content", contentOfTextarea);
            replyComment.remove();
            item.disabled = false;
          });
        }
      }
    });

    const dialog = document.querySelector("dialog");
    let del = document.querySelector(".deleteIcon");

    del.addEventListener("click", openMedia);
    let no = document.getElementById("no");
    let yes = document.getElementById("yes");

    no.addEventListener("click", closeTab);
    yes.addEventListener("click", DeletComment);

    function closeTab() {
      dialog.close();
    }

    function DeletComment() {
      dialog.close();
    }

    let edit = document.querySelector(".editIcon");
    edit.addEventListener("click", editeParagraph);

    function editeParagraph() {
      let textareas = document.querySelectorAll(".juliusomo textarea");
      let aa = document.querySelector(".juliusomo");
      aa.style.height = "283px";
      textareas.forEach((textarea) => {
        textarea.disabled = !textarea.disabled;
        textarea.classList.add("active");
        textarea.style.border = "1px solid hsl(238, 40%, 52%)";
        textarea.style.borderRadius = "5px";
        textarea.style.padding = "5px";
        let editbtn = document.querySelector(".hide");
        editbtn.style.display = "";
       
        // edit.disabled = true;
        const xy = document.querySelector(".active");
        xy.addEventListener(
          "change",
          (event) => (contentOfTextarea = event.target.value)
        );
        // edit.disabled = true;
        const c = document.querySelector(".confirmBtn");
        c.addEventListener("click", () => {
          localStorage.setItem("content", contentOfTextarea);
          c.remove();
          edit.disabled = false;
        });




      });
    }

    function openMedia() {
      dialog.showModal();
    }
  })
  .catch((error) => {
    console.error("Error handling data:", error);
  });
