  $(function() {

      /**
       * 获取生存数据
       * @param  {[type]} 生日字符串 [description]
       * @return {[type]}     [description]
       */
      function getExist(str) {
          // 出生日期
          var birth = new Date(str),
              birth_year = birth.getFullYear(),
              birth_month = birth.getMonth(),
              birth_day = birth.getDate();
          // 今天日期
          var today = new Date(),
              today_year = today.getFullYear(),
              today_month = today.getMonth(),
              today_day = today.getDate();
          // 生存时间
          var minutes = (today - birth) / 1000 / 60,
              hours = minutes / 60,
              day = hours / 24,
              week = day / 7,
              month,
              year = today_year - birth_year;
          // 日期之差
          var diff_month = today_month - birth_month,
              diff_day = today_day - birth_day;
          //若是今年还没到生日，则年龄减1，加上多出的月份。   
          if (diff_month < 0 || (diff_month === 0 && diff_day < 0)) {
              year--;
              month = year * 12 + (11 - birth_month + today_month) + 1;
          } else {
              month = year * 12 + diff_month;
          }
          Birth = {
              year: birth_year,
              month: birth_month,
              day: birth_day
          }
          $("#age").text(year);
          $(".year").text(year);
          $(".mouth").text(parseInt(month));
          $(".week").text(parseInt(week));
          $(".day").text(parseInt(day));
          $(".hours").text(parseInt(hours));
          $(".minutes").text(parseInt(minutes));
          has_age = true;
          age = year;
          second = new Date().getSeconds();
          localStorage.setItem("birth", str);

      }
      /**
       * 设置剩余生命
       * @param  {[type]} num [description] 年龄
       * @return {[type]}     [description]
       */
      function getSurplus(num) {
          var lifes = num - age,
              time = (24 * (age / num)).toString().split("."),
              hours = time[0] || 0,
              minutes = parseInt(Number("0." + (time[1] || 0)) * 60),
              die = new Date(Birth.year + parseInt(num) + "-" + (Birth.month + 1) + "-" + Birth.day),
              day = (die - new Date()) / 1000 / 3600 / 24,
              eat = day * 3,
              love = day / 3,
              week = day / 7,
              holiday = lifes * 7;
          $("#l-age").text(hours + "点" + minutes + "分");
          $(".eat").text(parseInt(eat));
          $(".love").text(parseInt(love));
          $(".l-week").text(parseInt(week));
          $(".holiday").text(parseInt(holiday));
          new Clock(image, sprite, c_black, c_width, c_height, "black", age, num);
          localStorage.setItem("all_lifes", num);
      }
      var c_width = document.getElementById("wrap").clientWidth * 0.8, //canvas宽度
          c_height = c_width * 0.6, //canvas高度
          c_white = document.getElementById("c_white"), //白色canvas
          c_black = document.getElementById("c_black"), ////黑色canvas
          image = new Image(), //图像容器
          sprite = {  //sprite图
              white: {
                  bg: [-2, -2, 1262, 1262],
                  hours: [2566, 537, 34, 313],
                  mintues: [2530, 65, 34, 352],
              },
              black: {
                  bg: [1266, 2, 1262, 1262],
                  hours: [2530, 773, 34, 313],
                  mintues: [2530, 419, 34, 352],
              },
              public: {
                  second: [2594, 2, 17, 533],
                  round: [2530, 2, 62, 61]
              }
          },
          clock_white, //白色时钟
          $page1 = $(".page1"), //页面1
          $page2 = $(".page2"), //页面2
          $page3 = $(".page3"), //页面3
          $page4 = $(".page4"), //页面4
          $menu = $(".menu"),
          $mask = $(".mask"),
          audio = document.getElementById("music-audio"),
          $sponsor = $(".sponsor"),
          age, //年龄
          Birth, //生日日期
          second = 0, //当前的秒数
          has_age = false; //是否选择了年龄

      if (localStorage.getItem("birth")) {
          $page1.removeClass("page-current");
          $page2.addClass("page-current");
          getExist(localStorage.getItem("birth"));
      }
      // 加载图像资源
      image.src = "../images/clock.png";
      image.onload = function() {
          clock_white = new Clock(image, sprite, c_white, c_width, c_height, ""), //白色时钟
              //时钟运行。
              setInterval(function() {
                  clock_white.draw();
                  if (has_age) {
                      second++;
                      if (second == 60) {
                          $(".minutes").text(parseInt($(".minutes").text()) + 1);
                          second = 0;
                      }

                  }
              }, 1000);
      };

      $(".more").on("click", function() {
          $menu.toggleClass("hide");
          
          $("body").one("click",function(){
            $menu.addClass("hide");
            return true;
          });
          return false;
      });
      $(".sponsor-btn").on("click", function() {
          $mask.show();
          $sponsor.removeClass("hide");

      });
      $(".close").on("click", function() {
          $sponsor.addClass("hide");
          $mask.hide();

      });
      $("#music").on("click", function() {
          if (audio.paused) {
              audio.play();
          } else {
              audio.pause();
          }
          $(this).toggleClass("stopped");
      });
      $("#set_brith,#set_lifes").on("click", function() {
          $menu.addClass("hide");
          if ($(this).attr("id") == "set_brith") {
              nextPage($(".page.page-current"), $page1);
          } else {
              nextPage($(".page.page-current"), $page3);
          }

      });
      //生日选择
      $("#btn-day").mobiscroll().date({
          setText: '确定',
          cancelText: '取消',
          theme: 'android-holo-light', //皮肤样式
          lang: 'zh',
          dateFormat: 'yyyy-mm-dd', //将只返回年月
          dateOrder: 'yymmdd',
          onSet: function(event, inst) {
              getExist(event.valueText);
              nextPage($page1, $page2);
          }
      });
      //年龄选择
      $("#btn-age").mobiscroll().number({
          theme: 'android-holo-light',
          defaultValue: "80",
          step: 1,
          setText: '确定',
          cancelText: '取消',
          theme: "android-holo-light",
          onSet: function(event, inst) {
              getSurplus(event.valueText);
              nextPage($page3, $page4);
          }
      });
      $("#btn-die").on("click", function() {
          $menu.addClass("hide");
          if (localStorage.getItem("all_lifes")) {
              getSurplus(localStorage.getItem("all_lifes"));
              nextPage($page2, $page4);
          } else {
              nextPage($page2, $page3);
          }

      });
      $("#btn-reject").on("click", function() {
          $menu.addClass("hide");
          nextPage($page3, $page2);
      });
      $("#btn-live").on("click", function() {
          $menu.addClass("hide");
          nextPage($page4, $page2);
      });
  });
