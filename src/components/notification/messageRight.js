import Swal from "sweetalert2";

function showMessage(even, text, timeout) {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: timeout,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon: even,
    title: '<div style=" font-weight: normal;">' + text + "</div>",
  });
}

function Success(title, content) {
  Swal.fire(title, content, "success");
}
function Warning(title, text, btnOK) {
  let check = Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: btnOK,
  }).then((result) => {
    if (result.isConfirmed) {
      return result.isConfirmed;
    } else {
      return false;
    }
  });
  return check;
}
function Error(title, content) {
  Swal.fire(title, content, "error");
}
function Information(title, content) {
  Swal.fire(title, content, "info");
}
function Question(title, text, btnOK) {
  let check = Swal.fire({
    title: title,
    text: text,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: btnOK,
  }).then((result) => {
    if (result.isConfirmed) {
      return result.isConfirmed;
    } else {
      return false;
    }
  });
  return check;
}

export default { showMessage, Success, Warning, Error, Information, Question };
