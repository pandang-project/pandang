/**
 * 
 */

let memberNumber = $('.memberNumber').val();
let memberNumberFrom = $('.memberNumberFrom').val();
let memberNumberTo = $('.memberNumberTo').val();

// @@@@@@ 이미지 클릭 했을 때 모달 창 띄우기 @@@@@@@@@
$('.snsList').on('click', $('.post-part') ,function(){
	if($('#store').css('color') ==  'rgb(42, 197, 198)'){
		 $(".s-post-modal").css("display", "flex");

  		$(".s-modal-background").css("display", "inline-block");
	} else {
		$(".modal-box").css("display", "flex");

		$(".modal-background").css("display", "inline-block");
	}
});
// @@@@@@@ 모달 영역 밖으로 클릭하면 모달 창 없애기 @@@@@@@

$(".modal-background").on("click", function() {
	$(".modal-box").css("display", "none");

	$(this).css("display", "none");
});

$('.s-modal-background').on('click', function(){
	$('.s-post-modal').css('display', 'none');
	$(this).css('display', 'none');
});

// @@@@@@@ 모달 신고하기 버튼 누를 시 @@@@@@@@
$(".modal-report-btn").on("click", function() {
	$(".report-path").css("display", "block");

	// 재클릭시 안보이게하기
	if ($(this).data("clicked")) {
		$(".report-path").css("display", "none");
	}
});

// @@@@@@@ 신고하기 버튼 클릭시 색 @@@@@@
$(".report-btn-color").on({
	mouseover: function() {
		$(this).css("color", "rgb(255, 0, 0)");
	},
	mouseout: function() {
		if ($(this).data("clicked") !== true) {
			$(this).css("color", "rgb(0, 0, 0)");
		}
	},
	click: function() {
		if ($(this).data("clicked") !== true) {
			$(this).css("color", "rgb(255, 0, 0)").data("clicked", true);
		} else {
			$(this).css("color", "rgb(0, 0, 0)").data("clicked", false);
		}
	},
});

// @@@@@@ 좋아요 @@@@@@@@

$(".modal-like-date").on("click", '.before-like-btn' ,function() {	
	if (
		$(this).attr("src") ===
		"https://cdn.loud.kr/prod/LOUD_IMG/designer/new/heart-gray-fill.png"
	) {
		$(this).attr(
			"src",
			"https://cdn.loud.kr/prod/LOUD_IMG/designer/new/heart-red-fill.png"
		);

		$.ajax({
			url: '/sns/snsLikeOk.sn',
			data: {
				snsNumber: snsNumber,
				memberNumber: memberNumber
			},
			success: function() {
				$.ajax({
					url: '/sns/snsReadOk.sn',
					type: 'get',
					dataType: 'json',
					data: { snsNumber: snsNumber ,
							memberNumber : memberNumber},
					success: function(result) {
						showSnsLikeDate(result);
					},
					error: function(a, b, c) {
						console.log(c);
					}

				});

			}
		});


	} else {
		$(this).attr(
			"src",
			"https://cdn.loud.kr/prod/LOUD_IMG/designer/new/heart-gray-fill.png"
		);

		$.ajax({
			url: '/sns/snsLikeDeleteOk.sn',
			data: {
				snsNumber: snsNumber,
				memberNumber: memberNumber
			},
			success: function() {
				$.ajax({
					url: '/sns/snsReadOk.sn',
					type: 'get',
					dataType: 'json',
					data: { snsNumber: snsNumber,
							memberNumber: memberNumber },
					success: function(result) {
						showSnsLikeDate(result);
					},
					error: function(a, b, c) {
						console.log(c);
					}

				});

			}
		});

	}
});



// @@@@@@@ 모달 팔로우 버튼 클릭 수정 @@@@@@@@
$(".modal-follow-btn").on("click", function() {
	
	if ($(this).children(".add").css("display") === "block") {
		$(this).children(".add").css("display", "none");
		$(this).children(".done").css("display", "block");
		
		$.ajax({
		url: '/sns/snsFollowOk.sn',
		type: 'get',
		data: { 
				memberNumberFrom : memberNumberFrom,
				memberNumberTo : memberNumberTo
				 },
		success: function() {
			console.log('gegege');
		},
		error: function(a, b, c) {
			console.log(c);
		}

		});
		
	} else {
		$(this).children(".add").css("display", "block");
		$(this).children(".done").css("display", "none");
		
		$.ajax({
		url: '/sns/snsFollowDeleteOk.sn',
		type: 'get',
		data: { 
				memberNumberFrom : memberNumberFrom,
				memberNumberTo : memberNumberTo
				 },
		success: function() {
			console.log('~~~~');
		},
		error: function(a, b, c) {
			console.log(c);
		}

		});
	}
});



// 팔로우 버튼 
$('.follow-btn-box').on('click', '.follow-btn',function(){
	$('.follow-btn-box').html('');
	$(this).css('display', 'none');
	$('.follow-btn-box').append(`<button class="following-btn">
								팔로잉 
									<span class="material-symbols-outlined"> check </span>
								</button>`);
	$('following-btn').css('display', 'block');
	
	
		$.ajax({
		url: '/sns/snsFollowOk.sn',
		type: 'get',
		data: { 
				memberNumberFrom : memberNumberFrom,
				memberNumberTo : memberNumberTo
				 },
		success: function() {
			$('.follower-cnt').text($('.follower-cnt').val()+1);
		},
		error: function(a, b, c) {
			console.log(c);
		}

		});
});

$('.follow-btn-box').on('click', '.following-btn', function(){
	$('.follow-btn-box').append(`<button class="follow-btn">팔로우</button>`);
	$('.following-btn').css('display', 'none');
	$('.follow-btn').css('display', 'block');
	
	$.ajax({
		url: '/sns/snsFollowDeleteOk.sn',
		type: 'get',
		data: { 
				memberNumberFrom : memberNumberFrom,
				memberNumberTo : memberNumberTo
				 },
		success: function(){
			$('.follower-cnt').text($('.follower-cnt').text()-1);
		}
		});
});


// @@@@@@@@@@@@@ SnsList Ajax@@@@@@@@@@@@@@@@
function showSnsList(result) {
	$(".snsList").html('');
	for (let i = 0; i < result.list.length; i++) {

		if (result.list.length == 0) {
			$('.snsList').append(`<div>
									<h1>아직 등록된 게시글이 없습니다!</h1>
								</div>`
			);
			
		} else {

			if (i % 3 == 0) {
				$('.snsList').append(`	<div class="post-section">`)
			}

			$('.snsList').append(`
		
							
							
							<div class="post-part">
								<input class="snsNumber" type="hidden"
									value="${result.list[i].snsNumber}"> 
									<img class="post-image" src="/upload/${result.list[i].snsFileSystemName}" />
								<div class="post-info">
									<div class="post-name-box">
										<span class="post-name"> 
										${result.list[i].snsTitle}
										</span>
									</div>
									<div class="date-like-wrap">
										<div class="post-date-box">
											<span class="post-date"> 
											${result.list[i].snsDate}
											</span>
										</div>
										<div class="post-like-cnt-box">
											<span class="heart">♥</span> <span class="like-cnt"> 
											${result.list[i].likeCnt}
											</span>
										</div>
										<div class="post-view-cnt-box">
											<span class="material-symbols-outlined"> visibility </span> <span
												class="view-cnt"> 
												${result.list[i].snsViewCnt}
											</span>
										</div>
									</div>
								</div>
							</div>

		`);


			if (i % 3 == 2) {
				$('.snsList').append(`
				</div>
			`);
			}

		}
	}

}

let thisPage = 1;
let realEndPage = $('.realEndPage').val();


$('.next').on('click', function() {
	
	if($('#store').css('color') ==  'rgb(42, 197, 198)'){
		if (thisPage != realEndPage) {
				

		$.ajax({
			url: "/sns/snsStoreListOk.sn",
			data: { page: thisPage + 1 },
			success: function(result) {
				showSnsList(result);
				thisPage = result.page;
				console.log(thisPage);
			}
		});

	}
	}else{
	
	if (thisPage != realEndPage) {


		$.ajax({
			url: '/sns/snsListOk.sn',
			data: { page: thisPage + 1 },
			success: function(result) {
				showSnsList(result);
				thisPage = result.page;
				console.log(thisPage);
			}
		});

	}

	}
});



$('.prev').on('click', function() {
	if($('#store').css('color') ==  'rgb(42, 197, 198)'){
		
		if (thisPage != 1) {

		$.ajax({
			url: '/sns/snsStoreListOk.sn',
			data: { page: thisPage - 1 },
			success: function(result) {
				showSnsList(result);
				thisPage = result.page;
				console.log(thisPage);
			}
		});

	}
		
	}else{
	

	if (thisPage != 1) {

		$.ajax({
			url: '/sns/snsListOk.sn',
			data: { page: thisPage - 1 },
			success: function(result) {
				showSnsList(result);
				thisPage = result.page;
				console.log(thisPage);
			}
		});

	}
	}
});

// @@@@@@@@@@@@@ SnsList Ajax 끝 @@@@@@@@@@@@@@@@

// ajax에서 .post-part 클릭시  snsNumber가져오는 이벤트 

let snsNumber;
let storeNumber;


$('.snsList').on('click', '.post-part', function() {
	
	
	if($('#store').css('color') ==  'rgb(42, 197, 198)'){
		
	storeNumber = $(this).children('.storeNumber').val();
	console.log(storeNumber);
	
	}else{
		
	
	snsNumber = $(this).children('.snsNumber').val();

	
	console.log(snsNumber);
	}
});



// 모달창 좋아요, 게시글 작성일 함수
function showSnsLikeDate(result) {

	$('.modal-like-date').html('');
	
		if (snsNumber == result.list.snsNumber) {

			if(result.likeTest === ""){
			$('.modal-like-date').append(`
			<div class="like-wrap">
			
			
					
						<img class="before-like-btn"
							src="https://cdn.loud.kr/prod/LOUD_IMG/designer/new/heart-gray-fill.png"
							alt="heart" />

					
						<div class="like-cnt">${result.list.likeCnt}</div>
						개
					</div>
					<div class="post-date">${result.list.snsDate}</div>
			`);
				}
			else{
				
				$('.modal-like-date').append(`
			<div class="like-wrap">
			
			
					
						<img class="before-like-btn"
							src="https://cdn.loud.kr/prod/LOUD_IMG/designer/new/heart-red-fill.png"
							alt="heart" />

					
						<div class="like-cnt">${result.list.likeCnt}</div>
						개
					</div>
					<div class="post-date">${result.list.snsDate}</div>
			`);
				
			}
			
		}


	
}


// 모달 게시글 콘텐츠 함수
function showPostContent(result) {
	$('.host-comment-content').html('');
	
		if (snsNumber == result.list.snsNumber) {

			$('.host-comment-content').append(`
					
					
							${result.list.snsContent}
						
				`);

		}
	
}

// 모달 게시글 댓글 함수


function showPostComment(result) {
	$('.comment').html('');
	let text = '';
	for (let i = 0; i < result.list.length; i++) {
		if (snsNumber == result.list[i].snsNumber && result.list[i].snsCommentNumber != 0) {

			
			text += `
				<div class="comment-wrap">
									<div class="comment-member-info-box">
										<div class="comment-member-info">
											<div class="comment-member-profile">
												 <a href="/sns/snsOk.sn?memberNumber=${result.list[i].memberNumber}" class="comment-member-img"> <img
													class="comment-profile-img"
													src="/upload/${result.list[i].channelFileSystemName}"
													alt="" />
												</a> 
											</div>
											<div class="comment-member-name-wrap">
												<a href="/sns/snsOk.sn?memberNumber=${result.list[i].memberNumber}" class="comment-member-name"> 
										
												${result.list[i].channelName}
						
												</a>
											</div>
										</div>
				
				`
			if (memberNumber == result.list[i].memberNumber) {
				text += `
					<div class="comment-option">
						<button class="comment-edit" type="button" data-number="${result.list[i].snsCommentNumber}">수정</button>
						<button class="comment-delete" type="button" data-number="${result.list[i].snsCommentNumber}">삭제</button>
					</div>
					
					<div class="comment-edit-option">
						<button class="comment-modify" type="button" data-number="${result.list[i].snsCommentNumber}">수정 완료 </button>
					</div>
					`

			}

			text += `
				</div>



									<div class="comment-content-wrap">
										<span class="comment-content"> 
										${result.list[i].snsCommentContent}
										</span>
									</div>
									<div class="comment-date">
										<span> 
										${result.list[i].snsCommentDate}
										</span>
									</div>
									</div>
				`;



		}
	}
	$('.comment').html(text);

}




$('.snsList').on('click', function() {
	if($('#store').css('color') ==  'rgb(42, 197, 198)'){
		$.ajax({
		url: '/sns/snsStoreReadOk.sn',
		type: 'get',
		dataType: 'json',
		data: { storeNumber: storeNumber },
		success: function(result) {
			showStorePost(result);
			
		},
		error: function(a, b, c) {
			console.log(c);
		}

	});
	
	} else {
		currentIdx = 0;
	$.ajax({
		url: '/sns/snsReadOk.sn',
		type: 'get',
		dataType: 'json',
		data: { snsNumber: snsNumber,
				memberNumber : memberNumber },
		success: function(result) {
			showSnsLikeDate(result);
			showPostContent(result);
		},
		error: function(a, b, c) {
			console.log(c);
		}

	});
	}
});

// 댓글 url 변경 


$('.snsList').on('click', function() {
	
	if($('#store').css('color') ==  'rgb(42, 197, 198)'){
		
		$.ajax({
		url: '/sns/snsStoreCommentOk.snc',
		type: 'get',
		dataType: 'json',
		data: { storeNumber: storeNumber },
		success: function(result) {
			showStoreComment(result);
		},
		error: function(a, b, c) {
			console.log(c);
		}

	});
		} else {
	
	$.ajax({
		url: '/sns/snsCommentOk.snc',
		type: 'get',
		dataType: 'json',
		data: { snsNumber: snsNumber },
		success: function(result) {
			showPostComment(result);
		},
		error: function(a, b, c) {
			console.log(c);
		}

	});
	}
});

// 댓글 작성 



$('.submit').on('click', function() {
	console.log('@@@@@@@@@');
	console.log($('#commentContent').val());
	console.log($('.memberNumber').val());

	$.ajax({

		url: "/sns/snsCommentInsertOk.snc",
		type: "get",
		data: {
			snsNumber: snsNumber,
			memberNumber: memberNumber,
			snsCommentContent: $('#commentContent').val()
		},
		success: function() {
			$('#commentContent').val('');
			$.ajax({
				url: '/sns/snsCommentOk.snc',
				type: 'get',
				dataType: 'json',
				data: { snsNumber: snsNumber },
				success: function(result) {
					showPostComment(result);
				},
				error: function(a, b, c) {
					console.log(c);
				}

			});
		},
		error: function(a, b, c) {
			console.log(c);
		}

	});

});

// 댓글 삭제 
$('.comment').on('click', '.comment-delete', function() {

	let snsCommentNumber = $(this).data('number');

	$.ajax({
		url: "/sns/snsCommentDeleteOk.snc",
		type: 'get',
		data: { snsCommentNumber: snsCommentNumber },
		success: function() {
			// 댓글 갱신
			$.ajax({
				url: '/sns/snsCommentOk.snc',
				type: 'get',
				dataType: 'json',
				data: { snsNumber: snsNumber },
				success: function(result) {
					showPostComment(result);
				},
				error: function(a, b, c) {
					console.log(c);
				}

			});

			console.log('success!!');
		}
	});
});

// 댓글 수정
$('.comment').on('click', '.comment-edit', function() {


	let $parent = $(this).closest('.comment-wrap');
	console.log($parent);

	let $children = $parent.find('.comment-option, .comment-edit-option');
	console.log($children);

	$children.eq(0).hide();
	$children.eq(1).show();

	let $content = $(this).parent().parent().next().children();
	console.log($content);

	$content.replaceWith(`<textarea class='modify-content'> </textarea>`);

});


// 댓글 수정 완료 처리
$('.comment').on('click', '.comment-modify', function() {
	let snsCommentNumber = $(this).data('number');
	console.log($('.modify-content').val());

	$.ajax({
		url: '/sns/snsCommentUpdateOk.snc',
		type: 'get',
		data: {
			snsCommentNumber: snsCommentNumber,
			snsCommentContent: $('.modify-content').val()
		},
		success: function() {
			$.ajax({
				url: '/sns/snsCommentOk.snc',
				type: 'get',
				dataType: 'json',
				data: { snsNumber: snsNumber },
				success: function(result) {
					showPostComment(result);
				},
				error: function(a, b, c) {
					console.log(c);
				}

			});
		}
	});
});

// 게시글 삭제
$('.modal-delete-btn-box').on('click', function() {
	
	$(".modal-box").css("display", "none");
	
	$.ajax({
		url: '/sns/snsPostDeleteOk.sn',
		type: 'get',
		data: { snsNumber: snsNumber },
		success: function() {
			$.ajax({
				url: '/sns/snsListOk.sn',
				data: { page: thisPage },
				success: function(result) {
					showSnsList(result);
					thisPage = result.page;
					console.log(thisPage);
				}
			});

			
		},
		error: function(a, b, c) {
			console.log(c);
		}

	});

});


$('#store').on('click',function(){
	$(this).css('color', ' rgb(42, 197, 198)');
	$('#post-btn').css('color', '#5b696f');
	
	
	$.ajax({
		url: "/sns/snsStoreListOk.sn",
		type : 'get',
		data : {page : thisPage},
		success : function(result){
			console.log('!!!!!!');
			showStoreList(result);
		}
		
	});
	
});

$('#post-btn').on('click', function(){
	$(this).css('color', ' rgb(42, 197, 198)');
	$('#store').css('color', '#5b696f');
	$.ajax({
		url:'/sns/snsListOk.sn',
		type: 'get',
		data:  {page : thisPage},
		success : function(result){
			showSnsList(result);
		}
		
	});
});


function showSnsFile(result){
		
		$('.slide-box').html('');
	for (let i = 0; i < result.length; i++) {
		$('.slide-box').append(`
			<li>
				<img class="modal-img" src="/upload/${result[i]}"/>
			</li>
		`);
	}
	
	let slides = document.querySelector(".slide-box");
	let slideImg = document.querySelectorAll(".slide-box li");
	let currentIdx = 0;
	const slideCount = slideImg.length;
	const slideWidth = 600;
	const slideMargin = 100;

//전체 슬라이드 컨테이너 넓이 설정
slides.style.width = (slideWidth + slideMargin) * slideCount + "px";

// 이미지 최대 개수나 최저 개수 도달시 버튼을 없애는 js
function checkEnd() {
	if (currentIdx <= 0) {
		$(".post-img-prev").css("display", "none");
	} else {
		$(".post-img-prev").css("display", "block");
	}

	if (currentIdx >= slideCount - 1) {
		$(".post-img-next").css("display", "none");
	} else {
		$(".post-img-next").css("display", "block");
	}
}

checkEnd();


$(".post-img-next").on("click", function() {
	
	currentIdx++;
	$('.slide-box').children().css('display', 'none');
	$('.slide-box').children().eq(currentIdx).css('display', 'block');
	
	
	checkEnd();
});

$(".post-img-prev").on("click", function() {
	currentIdx--;
	$('.slide-box').children().css('display', 'none');
	$('.slide-box').children().eq(currentIdx).css('display', 'block');
	
	checkEnd();
});


	
	
}


$('.snsList').on('click', function(){
		$.ajax({
		url: '/sns/snsFileReadOk.sn',
		type: 'get',
		dataType: 'json',
		data: { snsNumber : snsNumber },
		success: function(result) {
			showSnsFile(result);
			
		},
		error: function(a, b, c) {
			console.log(c);
		}

	});
	
});



function showStoreList(result){
	$(".snsList").html('');
	for (let i = 0; i < result.list.length; i++) {



		if (result.list[i].storeNumber == 0) {
			$('.snsList').html(`<div>
									<h1>아직 등록된 게시글이 없습니다!</h1>
								</div>`
			);
		} else {

			if (i % 3 == 0) {
				$('.snsList').append(`	<div class="post-section">`)
			}

			$('.snsList').append(`	
							<div class="post-part">
								<input class="storeNumber" type="hidden"
									value="${result.list[i].storeNumber}"> 
									<img class="post-image" src="/assets/img/SNSPage/03.jpg" />
								<div class="post-info">
									<div class="post-name-box">
										<span class="post-name"> 
										${result.list[i].storeTitle}
										</span>
									</div>
									<div class="date-like-wrap">
										<div class="post-date-box">
											<span class="post-date"> 
											${result.list[i].storeDate}
											</span>
										</div>
										<div class="post-like-cnt-box">
											<span class="heart">♥</span> <span class="like-cnt"> 
											${result.list[i].likeCnt}
											</span>
										</div>
										<div class="post-view-cnt-box">
											<span class="material-symbols-outlined"> visibility </span> <span
												class="view-cnt"> 
												${result.list[i].storeViewCnt}
											</span>
										</div>
									</div>
								</div>
							</div>

		`);


			if (i % 3 == 2) {
				$('.snsList').append(`
				</div>
			`);
			}

		}
	}

}


function showStorePost(result){
	$('.s-post-header-box').html('');
	
		if (storeNumber == result.storeNumber) {
			$('.s-post-header-box').append(`
				<div class="s-post-header">
              <div class="s-post-title">
					${result.storeTitle}
				</div>
              <div class="s-post-date-categori-box">
                <div class="s-post-date">
					${result.storeDate}
				</div>
                <div>l</div>
                <div class="s-post-categori">${result.hashtagName}</div>
              </div>
            </div>
            <div class="s-post-information">
              <div class="s-post-view-cnt">
                <span class="material-symbols-outlined"> visibility </span>
                <div class="s-view-cnt">${result.storeViewCnt}</div>
              </div>
              <div class="s-post-like-cnt">
                <span class="material-symbols-outlined"> favorite </span>
                <div class="s-p-like-cnt">${result.likeCnt}</div>
              </div>
              <div class="s-post-comment-cnt">
                <span class="material-symbols-outlined"> chat_bubble </span>
                <div class="s-comment-cnt">${result.storeCommentCnt}</div>
              </div>
            </div>
			
			
			`);
		
		}
	
}


function showStoreComment(result){
	$('.s-commentL').html('');
	let text = '';
	for (let i = 0; i < result.list.length; i++) {
		if (storeNumber == result.list[i].storeNumber && result.list[i].storeCommentNumber != 0) {
			
			text += `<div class="s-comment-list">
              <!-- @@@@@@@@@ 댓글 list @@@@@@@@@@ -->
              <a herf="#" class="s-comment-user-profile-shortcuts">
                <div class="s-comment-user-profile-wrap">
                  <img
                    src="https://cdn-bastani.stunning.kr/prod/users/3dbbdc56-858d-4d0e-b467-1463957476e3/avatar/ZQdoCULUEydS7bnM.image.jpg.small?q=60&t=crop&s=300x300"
                    alt=""
                  />
                </div>
              </a>
              <div class="s-text-wrap">
                <div class="s-comment-member-info">
                  <a href="/sns/snsOk.sn?memberNumber=${result.list[i].memberNumber}" class="s-member-id">${result.list[i].channelName}</a>
                  <div class="s-box"></div>
                  <div class="s-comment-date">${result.list[i].storeCommentDate}</div>
                  `

				if(memberNumber == result.list[i].memberNumber){
					text += `
					
					<div class="s-comment-edit-delete-btn-box">
                    <button class="s-comment-edit-btn" data-number="${result.list[i].storeCommentNumber}">수정</button>

                    <button class="s-comment-delete-btn"  data-number="${result.list[i].storeCommentNumber}">삭제</button>
                  </div>

					 <div class="s-edit-btn-box">
                      <button type="submit" class="s-edit-btn" data-number="${result.list[i].storeCommentNumber}">
                        수정 완료
                      </button>
                  </div>`
				}
				
				text += `
					</div>
				<div class="s-height-box"></div>
                <div class="s-comment">
                  <span class="s-comment-content">
					${result.list[i].storeCommentContent}
                  </span>
                 
                  
                </div>
              </div>
              <!-- @@@@@@@@@ 댓글 리스트 끝  @@@@@@@@@@ -->
            </div>`;
		}
	}
	$('.s-commentL').html(text);
}

/* store 모달 댓글 작성 */
$('.s-comment-submit-btn').on('click', function() {
	
	$.ajax({

		url: "/sns/snsStoreCommentInsertOk.snc",
		type: "get",
		data: {
			storeNumber: storeNumber,
			memberNumber: memberNumber,
			storeCommentContent: $('.s-comment-input-area').val()
		},
		success: function() {
			$('.s-comment-input-area').val('');
			$.ajax({
				url: '/sns/snsStoreCommentOk.snc',
				type: 'get',
				dataType: 'json',
				data: { storeNumber: storeNumber },
				success: function(result) {
					showStoreComment(result);
				},
				error: function(a, b, c) {
					console.log(c);
				}

			});
		},
		error: function(a, b, c) {
			console.log(c);
		}

	});

});

// store 댓글 삭제
$('.s-comment-container').on('click', '.s-comment-delete-btn', function() {

	let storeCommentNumber = $(this).data('number');

	$.ajax({
		url: "/sns/snsStoreCommentDeleteOk.snc",
		type: 'get',
		data: { storeCommentNumber: storeCommentNumber },
		success: function() {
			// 댓글 갱신
			$.ajax({
				url: '/sns/snsStoreCommentOk.snc',
				type: 'get',
				dataType: 'json',
				data: { storeNumber: storeNumber },
				success: function(result) {
					showStoreComment(result);
				},
				error: function(a, b, c) {
					console.log(c);
				}

			});

			console.log('success!!');
		}
	});
});


// store 댓글 수정

$('.s-comment-container').on('click', '.s-comment-edit-btn', function() {


	let $parent = $(this).closest('.s-comment-list');
	console.log($parent);

	 let $children = $parent.find('.s-comment-edit-delete-btn-box, .s-edit-btn-box');
	console.log($children);

	$children.eq(0).hide();
	$children.eq(1).show();

	let $content = $(this).closest('.s-comment-list').find('.s-comment-content');
	console.log($content);

	$content.replaceWith(`<textarea class='modify-content'> </textarea>`);

});


$('.s-comment-container').on('click', '.s-edit-btn', function() {
	let storeCommentNumber = $(this).data('number');
	console.log($('.modify-content').val());

	$.ajax({
		url: '/sns/snsStoreCommentUpdateOk.snc',
		type: 'get',
		data: {
			storeCommentNumber: storeCommentNumber,
			storeCommentContent: $('.modify-content').val()
		},
		success: function() {
			$.ajax({
				url: '/sns/snsStoreCommentOk.snc',
				type: 'get',
				dataType: 'json',
				data: { storeNumber: storeNumber },
				success: function(result) {
					showStoreComment(result);
				},
				error: function(a, b, c) {
					console.log(c);
				}

			});
		}
	});
});






// 이 밑은 다 스토어 모달!!~!!!!!
// @@@@@@@@@@@ 모달 창 좋아요 버튼 누를 시 하트색 변경 @@@@@@@@@@@@@
$(".s-like-btn-color").on({
  mouseover: function () {
    $(this).css("color", "rgb(255, 0, 0)");
  },
  mouseout: function () {
    if ($(this).data("clicked") !== true) {
      $(this).css("color", "rgb(0, 0, 0)");
    }
  },
  click: function () {
    if ($(this).data("clicked") !== true) {
      $(this).css("color", "rgb(255, 0, 0)").data("clicked", true);

		$.ajax({
			url: '/sns/snsStoreLikeOk.sn',
			data: {
				storeNumber: storeNumber,
				memberNumber: memberNumber
			},
			success: function() {
				$.ajax({
					url: '/sns/snsStoreReadOk.sn',
					type: 'get',
					dataType: 'json',
					data: { storeNumber: storeNumber },
					success: function(result) {
						showStorePost(result);
					},
					error: function(a, b, c) {
						console.log(c);
					}

				});

			}
		});
    } else {
      $(this).css("color", "rgb(0, 0, 0)").data("clicked", false);
		$.ajax({
			url: '/sns/snsStoreLikeDeleteOk.sn',
			data: {
				storeNumber: storeNumber,
				memberNumber: memberNumber
			},
			success: function() {
				$.ajax({
					url: '/sns/snsStoreReadOk.sn',
					type: 'get',
					dataType: 'json',
					data: { storeNumber: storeNumber },
					success: function(result) {
						showStorePost(result);
					},
					error: function(a, b, c) {
						console.log(c);
					}

				});

			}
		});
		
    }
  },
});

// @@@@@@@ 모달 팔로우 버튼 클릭 수정 @@@@@@@@
$(".s-modal-follow-btn").on("click", function () {
  if ($(this).children(".add").css("display") === "flex") {
    $(this).children(".add").css("display", "none");
    $(this).children(".done").css("display", "flex");

	$.ajax({
		url: '/sns/snsFollowOk.sn',
		type: 'get',
		data: { 
				memberNumberFrom : memberNumberFrom,
				memberNumberTo : memberNumberTo
				 },
		success: function() {
			console.log('gegege');
		},
		error: function(a, b, c) {
			console.log(c);
		}

		});
  } else {
    $(this).children(".add").css("display", "flex");
    $(this).children(".done").css("display", "none");
	$.ajax({
		url: '/sns/snsFollowDeleteOk.sn',
		type: 'get',
		data: { 
				memberNumberFrom : memberNumberFrom,
				memberNumberTo : memberNumberTo
				 },
		success: function() {
			console.log('~~~~');
		},
		error: function(a, b, c) {
			console.log(c);
		}

		});
  }
});

// @@@@@ 모달 프로필 hover 시에 나오는 모달 @@@@@@
$("#s-profile").on("mouseover", function () {
  $(this).css("width", "100%");
  $(".s-profile-path").css("display", "block");
});

$(".s-profile-path").on("mouseleave", function () {
  $(".s-profile-path").css("display", "none");
});

// @@@@@ 모달 프로필 이미지 백그라운드 @@@@@
$("#s-modal-img-box").on({
  mouseover: function () {
    $(".s-modal-img-background").css("display", "block");
  },
  mouseout: function () {
    $(".s-modal-img-background").css("display", "none");
  },
});

//@@@@@ 모달 안에 모달 팔로우 버튼 @@@@@@
$(".s-profile-modal-follow-btn").on("click", function () {
  if ($(this).css("display") === "block") {
    $(this).css("display", "none");
    $(".s-profile-modal-following-btn").css("display", "flex");
		$.ajax({
		url: '/sns/snsFollowOk.sn',
		type: 'get',
		data: { 
				memberNumberFrom : memberNumberFrom,
				memberNumberTo : memberNumberTo
				 },
		success: function() {
			console.log('gegege');
		},
		error: function(a, b, c) {
			console.log(c);
		}

		});
  }

  $(".s-profile-modal-following-btn").on("click", function () {
    if ($(this).css("display") === "flex") {
      $(this).css("display", "none");
      $(".s-profile-modal-follow-btn").css("display", "block");
		$.ajax({
		url: '/sns/snsFollowDeleteOk.sn',
		type: 'get',
		data: { 
				memberNumberFrom : memberNumberFrom,
				memberNumberTo : memberNumberTo
				 },
		success: function() {
			console.log('~~~~');
		},
		error: function(a, b, c) {
			console.log(c);
		}

		});
    }
  });
});


// @@@@@@@ 모달 신고하기 버튼 누를 시 @@@@@@@@
$(".s-modal-report-btn").on("click", function () {
  $(".s-report-path").css("display", "block");

  // 재클릭시 안보이게하기
  if ($(this).data("clicked")) {
    $(".s-report-path").css("display", "none");
  }
});

// @@@@@@@ 신고하기 버튼 클릭시 색 @@@@@@
$(".s-report-btn-color").on({
  mouseover: function () {
    $(this).css("color", "rgb(255, 0, 0)");
  },
  mouseout: function () {
    if ($(this).data("clicked") !== true) {
      $(this).css("color", "rgb(0, 0, 0)");
    }
  },
  click: function () {
    if ($(this).data("clicked") !== true) {
      $(this).css("color", "rgb(255, 0, 0)").data("clicked", true);
    } else {
      $(this).css("color", "rgb(0, 0, 0)").data("clicked", false);
    }
  },
});



