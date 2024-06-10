function fetchData() {
  if (!localStorage.getItem("data")) {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("data", JSON.stringify(data));
        showData();
      })
      .catch((error) => console.error("Error fetching data:", error));
  } else {
    showData();
  }
}

function showData() {
  let mainBody = document.getElementById("main");
  mainBody.innerHTML = "";
  const localCommentsData = localStorage.getItem("data");
  const comments = JSON.parse(localCommentsData).comments;

  comments.forEach((comment) => {
    createPost(mainBody, comment);
  });

  addEventListeners();
}

function createPost(mainBody, comment) {
  const post = document.createElement("div");
  post.setAttribute("class", "post");
  post.dataset.id = comment.id;

  const firstComment = createComment(comment);
  post.appendChild(firstComment);

  const replycommentItem = document.createElement("div");
  replycommentItem.setAttribute("class", "replycommentItem");

  comment.replies.forEach((reply) => {
    createNestedReplies(replycommentItem, reply);
  });

  post.appendChild(replycommentItem);
  mainBody.appendChild(post);
}

function createNestedReplies(parentElement, reply) {
  const postReply = document.createElement("div");
  postReply.setAttribute("class", "postReply");

  const firstCommentReply = createComment(reply, true);
  postReply.appendChild(firstCommentReply);
  parentElement.appendChild(postReply);

  const nestedRepliesContainer = document.createElement("div");
  nestedRepliesContainer.setAttribute("class", "replycommentItem");

  if (reply.replies && reply.replies.length > 0) {
    reply.replies.forEach((nestedReply) => {
      createNestedReplies(nestedRepliesContainer, nestedReply);
    });
  }

  postReply.appendChild(nestedRepliesContainer);
}

function createComment(comment, isReply = false) {
  const firstComment = document.createElement("div");
  firstComment.setAttribute("class", "firstComment");
  if (isReply) {
    firstComment.dataset.id = comment.id; // Add this line to set the data-id attribute
  }

  const profile = createProfile(comment.user, comment.createdAt);
  firstComment.appendChild(profile);

  const content = document.createElement("div");
  content.innerHTML = comment.content;
  content.className = "paragraph";
  firstComment.appendChild(content);

  const box = createBox(comment);
  firstComment.appendChild(box);

  if (!isReply) {
    addCommentClass(firstComment, comment.user.username);
  }

  return firstComment;
}

function createProfile(user, createdAt) {
  const profile = document.createElement("div");
  profile.setAttribute("class", "profileSection");

  const image = document.createElement("img");
  image.src = user.image.webp;
  image.setAttribute("class", "profilePic");
  profile.appendChild(image);

  const name = document.createElement("h5");
  name.innerHTML = user.username;
  name.className = "name";
  profile.appendChild(name);

  if (user.username === "juliusomo") {
    const you = document.createElement("div");
    you.innerHTML = "you";
    you.className = "you";
    profile.classList.add("jul");
    profile.appendChild(you);
  }

  const date = document.createElement("span");
  date.innerHTML = createdAt;
  profile.appendChild(date);

  return profile;
}

function createBox(comment) {
  console.log(comment.user.username);
  const box = document.createElement("div");
  box.setAttribute("class", "box");

  const btn = document.createElement("div");
  btn.setAttribute("class", "btn");

  const plus = document.createElement("span");
  plus.innerHTML = `<img class="plus" src="./images/icon-plus.svg" alt="">`;

  const score = document.createElement("span");
  score.innerHTML = `${comment.score}`;
  score.setAttribute("class", "counter");

  const minus = document.createElement("span");
  minus.innerHTML = `<img class="minus" src="./images/icon-minus.svg" alt="">`;

  btn.appendChild(plus);
  btn.appendChild(score);
  btn.appendChild(minus);

  box.appendChild(btn);

  const reply = document.createElement("button");

  reply.setAttribute("class", "replysection");
  reply.classList.add("repp");

  const name = comment.user.username;

  if (name === "juliusomo") {
    const deleteIcon = document.createElement("div");
    deleteIcon.innerHTML = `<img class="delete" src="./images/icon-delete.svg" alt="">Delete`;
    box.appendChild(deleteIcon);
    deleteIcon.setAttribute("class", "deleteIcon");

    const editIcon = document.createElement("div");
    editIcon.innerHTML = `<img class="edit" src="./images/icon-edit.svg" alt="">Edit`;
    box.appendChild(editIcon);
    editIcon.setAttribute("class", "editIcon");
  } else {
    reply.innerHTML = `<img class="reply" src="./images/icon-reply.svg" alt="">reply`;
    box.appendChild(reply);
  }

  return box;
}

function addCommentClass(firstComment, username) {
  if (username === "maxblagun") {
    firstComment.classList.add("maxblagun");
  } else if (username === "amyrobson") {
    firstComment.classList.add("amyrobson");
  }
}

function addEventListeners() {
  document.querySelectorAll(".plus").forEach((item) => {
    item.addEventListener("click", plusOne);
  });

  document.querySelectorAll(".minus").forEach((item) => {
    item.addEventListener("click", minusOne);
  });

  document.querySelectorAll(".repp").forEach((item) => {
    item.addEventListener("click", (event) => ReplyClick(event));
  });

  const dialog = document.querySelector("dialog");
  let del = document.querySelector(".deleteIcon");
  if (del) {
    del.addEventListener("click", () => dialog.showModal());
  }

  let no = document.getElementById("no");
  let yes = document.getElementById("yes");

  if (no) {
    no.addEventListener("click", () => dialog.close());
  }

  if (yes) {
    yes.addEventListener("click", () => dialog.close());
  }

  let edit = document.querySelector(".editIcon");
  
  if (edit) {
    edit.addEventListener("click", editParagraph);
  }
}

function plusOne(event) {
  let item = event.target.closest(".plus");
  let scoreElement = item.parentNode.nextSibling;
  let currentScore = parseInt(scoreElement.innerHTML);
  scoreElement.innerHTML = ++currentScore;
  item.removeEventListener("click", plusOne);

  updateLocalStorageScore(item, currentScore);
}

function minusOne(event) {
  let item = event.target.closest(".minus");
  let scoreElement = item.parentNode.previousSibling;
  let currentScore = parseInt(scoreElement.innerHTML);
  scoreElement.innerHTML = --currentScore;
  item.removeEventListener("click", minusOne);

  updateLocalStorageScore(item, currentScore);
}

function updateLocalStorageScore(item, newScore) {
  const post = item.closest(".post");
  if (!post) return;

  const postId = parseInt(post.dataset.id);
  const firstComment = item.closest(".firstComment");
  const commentId = firstComment ? parseInt(firstComment.dataset.id) : null;

  const localCommentsData = JSON.parse(localStorage.getItem("data"));
  const comments = localCommentsData.comments;

  comments.forEach((comment) => {
    if (comment.id === postId) {
      if (commentId) {
        const reply = findReplyById(comment.replies, commentId);
        if (reply) {
          reply.score = newScore;
        }
      } else {
        comment.score = newScore;
      }
    }
  });

  localStorage.setItem("data", JSON.stringify(localCommentsData));
}

function findReplyById(replies, replyId) {
  for (let reply of replies) {
    if (reply.id === replyId) {
      return reply;
    } else if (reply.replies) {
      const nestedReply = findReplyById(reply.replies, replyId);
      if (nestedReply) {
        return nestedReply;
      }
    }
  }
  return null;
}

function ReplyClick(event) {
  const item = event.target.closest(".replysection");
  const post = item.closest(".post, .postReply");

  if (!post.querySelector(".addDivreply")) {
    const replyComment = document.createElement("div");
    replyComment.className = "addDivreply";
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
      saveReply(post, contentOfTextarea);
      replyComment.remove();
      item.disabled = false;
    });
  }
}

function saveReply(post, content) {
  const localCommentsData = JSON.parse(localStorage.getItem("data"));
  const comments = localCommentsData.comments;

  const newReply = {
    id: Date.now(),
    content: content,
    createdAt: "Just now",
    score: 0,
    replyingTo: post.querySelector(".name").innerText,
    user: {
      image: {
        png: "./images/avatars/image-juliusomo.png",
        webp: "./images/avatars/image-juliusomo.webp",
      },
      username: "juliusomo",
    },
    replies: [],
  };

  const parentPost = post.closest(".post");
  if (!parentPost) return;

  const postId = parseInt(parentPost.dataset.id);
  let replySection = parentPost.querySelector(".replycommentItem");

  const isNestedReply =
    post.classList.contains("postReply") || post.closest(".postReply");
  const parentReply = post.closest(".firstComment");

  if (isNestedReply && parentReply) {
    const parentReplyId = parseInt(parentReply.dataset.id);

    comments.forEach((comment) => {
      if (comment.id === postId) {
        const foundReply = findReplyById(comment.replies, parentReplyId);
        if (foundReply) {
          foundReply.replies = foundReply.replies || [];
          foundReply.replies.push(newReply);
        }
      }
    });

    const parentReplyContainer = parentReply.closest(".postReply");
    const newReplyElement = createComment(newReply, true);
    parentReplyContainer
      .querySelector(".replycommentItem")
      .appendChild(newReplyElement);
  } else {
    comments.forEach((comment) => {
      if (comment.id === postId) {
        comment.replies.push(newReply);
      }
    });

    const newReplyElement = createComment(newReply, true);
    replySection.appendChild(newReplyElement);
  }

  localStorage.setItem("data", JSON.stringify(localCommentsData));
}
function editParagraph() {
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

    const xy = document.querySelector(".active");
    xy.addEventListener(
      "change",
      (event) => (contentOfTextarea = event.target.value)
    );

    const c = document.querySelector(".confirmBtn");
    c.addEventListener("click", () => {
      localStorage.setItem("content", contentOfTextarea);
      c.remove();
    });
  });
}

fetchData();
