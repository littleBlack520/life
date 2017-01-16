<?php
/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2017/1/16
 * Time: 14:13
 */

require_once "MysqliDb.php";
header('Content-type: application/json;charset=utf8');
$type = $_REQUEST['type'];
$db = new MysqliDb (Array(
    'host' => 'localhost',
    'username' => 'root',
    'password' => '1417789619',
    'db' => 'life',
    'port' => 3306,
    'prefix' => 'life_',
    'charset' => 'utf8'));
function getData($db)
{
    $page = $_REQUEST['page'];
    $limit = $_REQUEST['limit'];
    $page = isset($page) ? (int)$page : 1;
    $limit = isset($limit) ? (int)$limit : 5;
    if ($page < 1) {
        $page = 1;
    }
    if ($limit < 1) {
        $limit = 1;
    }
    $db->pageLimit = $limit;
    $db->orderBy("id","desc");
    $data = $db->arraybuilder()->paginate("hope", $page);
    echo json_encode(array('data' => $data, 'curpage' => $page, '$totalPage' => $db->totalPages));
}

function setData($db)
{
    $username = trim($_REQUEST['username']);
    $content = trim($_REQUEST['content']);
    $status = 1;
    $msg = "插入成功";

    if ($username == "") {
        $status = 2;
        $msg = "用户名不能为空";
    } else if (mb_strlen($username, "utf8") > 20) {
        $status = 3;
        $msg = "用户名长度不能大于20";
    } else if ($content == "") {
        $status = 4;
        $msg = "内容不能为空";
    } else if (mb_strlen($content, "utf8") > 200) {
        $status = 5;
        $msg = "内容不能大于200字";
    } else {
        $data = array(
            'username' => $username,
            'content' => $content,
            'time' => time()
        );
        if (!$db->insert("hope", $data)) {
            $msg = "插入失败";
            $status = 0;
        }
    }

    echo json_encode(array('status' => $status, 'msg' => $msg));
}

if ($type == "set") {
    setData($db);
} else {
    getData($db);
}

