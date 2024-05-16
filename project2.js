//get data

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

      const date = document.createElement("span");
      date.innerHTML = comments.createdAt;
      profile.appendChild(date);

      const content = document.createElement("div");
      content.innerHTML = comments.content;
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

      const reply = document.createElement("div");
      reply.innerHTML = `<img class="reply" src="./images/icon-reply.svg" alt="">reply`;
      box.appendChild(reply);
      reply.setAttribute("class", "replysection");

      mainBody.appendChild(post);
      //vvvvvvvvvvvvvvvvvvvvv
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

        if (name.innerHTML === "juliusomo") {
          const you = document.createElement("div");
          you.innerHTML = "you";
          you.className = "you";
          profile.appendChild(you);
        }

        const date = document.createElement("span");
        date.innerHTML = repliesItem.createdAt;
        profile.appendChild(date);

        const content = document.createElement("div");
        content.innerHTML = repliesItem.content;
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
        }
      });
    });

    const plusToNumber = document.querySelectorAll(".plus");
    const minusToNumber = document.querySelectorAll(".minus");
    const replyToComment = document.querySelectorAll(".reply");
    const replyToPost = document.querySelectorAll(".replyToPost");

    plusToNumber.forEach((item) => {
      item.addEventListener("click", plusOne);

      function plusOne(event) {
        let scoreElement = item.parentNode.nextSibling;
        let currentScore = parseInt(scoreElement.innerHTML);
        scoreElement.innerHTML = ++currentScore;
      }
    });

    minusToNumber.forEach((item) => {
      console.log(item);
      item.addEventListener("click", minusOne);

      function minusOne(event) {
        let scoreElement = item.parentNode.previousSibling;
        let currentScore = parseInt(scoreElement.innerHTML);
        scoreElement.innerHTML = --currentScore;
      }
    });

    replyToComment.forEach((item) => {
      item.addEventListener("click", ReplyClick);

      function ReplyClick() {
        const replyComment = document.createElement("div");
        replyComment.className = "addDiv";
        const post = item.closest(".post");
        const dom = post.firstElementChild.nextElementSibling;
        console.log(dom);

        if (dom) {
          const last = mainBody.lastElementChild;
          const commentBox = document.createElement("div");
          last.appendChild(commentBox);
          commentBox.setAttribute("class", "commentBox");

          const commentBoxtext = document.createElement("textarea");
          commentBox.appendChild(commentBoxtext);
          commentBoxtext.setAttribute("class", "commentBoxtext");

          const imagebox = document.createElement("img");
          imagebox.src = "./images/avatars/image-juliusomo.webp";
          imagebox.setAttribute("class", "imagebox");
          commentBox.appendChild(imagebox);

          const butn = document.createElement("button");
          butn.innerHTML = `Send`;
          butn.setAttribute("class", "butn");
          commentBox.appendChild(butn);
          item.removeEventListener("click", ReplyClick);
        } else {
          replyComment.innerHTML = `<img class="avatar" src="./images/avatars/image-juliusomo.webp" alt="">
                                <textarea name="text" class="textarea" cols="30" rows="10"></textarea>
                                <button class="replyButton">Reply</button>`;
          post.appendChild(replyComment);
          item.removeEventListener("click", ReplyClick);
        }
      }
    });
    replyToPost.forEach((item) => {
      item.addEventListener("click", ReplyClick);

      function ReplyClick() {
        const replyComment = document.createElement("div");
        replyComment.className = "addDivreply";
        const post = item.closest(".postReply");
        replyComment.innerHTML = `<img class="avatar" src="./images/avatars/image-juliusomo.webp" alt="">
                                <textarea name="text" class="replytextarea" cols="30" rows="10"></textarea>
                                <button class="replyButton">Reply</button>`;
        post.appendChild(replyComment);
        item.removeEventListener("click", ReplyClick);
      }
    });

    const dialog = document.querySelector("dialog");
    let del = document.querySelector(".delete");
    del.addEventListener("click", openMedia);
    let no = document.getElementById("no");
    let yes = document.getElementById("yes");

    no.addEventListener("click", closeTab);
    yes.addEventListener("click", DeletComment);

    function closeTab() {
      dialog.close();
    }

    function DeletComment() {
      let xx = document.querySelector("replycommentItem");
      console.log("delete");
      dialog.close();
    }

    function openMedia() {
      dialog.showModal();
    }
  })
  .catch((error) => {
    console.error("Error handling data:", error);
  });
