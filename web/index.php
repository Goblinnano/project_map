<?php
$pages = 1;
$images = '../img/Floor Plan_CC1_1.png';

if (isset($_GET['pages']) && $_GET['pages'] != '') {
    $pages = $_GET['pages'];

    if ($pages == '1') {
        $images = '../img/Floor Plan_CC1_1.png';
    } else if ($pages == '2') {
        $images = '../img/Floor Plan_CC1_2.png';
    } else if ($pages == '3') {
        $images = '../img/Floor Plan_CC1_3.png';
    } else if ($pages == '4') {
        $images = '../img/Floor Plan_CC1_4.png';
    } else if ($pages == '5') {
        $images = '../img/Floor Plan_CC1_5.png';
    } else if ($pages == '6') {
        $images = '../img/Floor Plan_CC1_6.png';
    }
}
?>

<!DOCTYPE html>
<html>

<head>
    <link rel="shortcut icon" type="x-icon" href="../img/logo.png"> <!-- logo -->
    <link rel="stylesheet" href="../css/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <!-- icon Share -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
    <!-- ลิงก์ไปที่ต่าง ๆ in icon Share -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <!-- jsPDF -->
    <script src="https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js"></script>
    <!-- Feather Icons library -->
</head>

<body>
    <div>
        <nav class="navbar1">
            <div class="navdiv1">
                <div class="logo"><a href="#">PointPath</a> </div>
                <!-- <a id="floor-label">ชั้นที่ 1</a>  -->
                <ul>
                    <button class="cssbuttons-io-button" onclick="showDownloadModal()">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="24">
                            <path fill="none" d="M0 04v24H0z"></path>
                            <path fill="currentColor"
                                d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 12h3l-4 5-4-5h3V8h2v4z">
                            </path>
                        </svg>
                        <span>Download</span>
                    </button>

                    <!-- ภายในปุ่ม Download -->
                    <div class="overlay" id="overlay" onclick="closeModal()" style="display:none;"></div>
                    <div class="modal" id="modal" style="display:none;">
                        <div class="button-container">
                            <button class="custom-button" onclick="showDonePopup()">Done</button>
                            <button class="custom-button1" onclick="closeModal()"
                                style="margin-left: auto;">Close</button>
                        </div>
                        <!-- <p>คาเม_คาเม_คาเม พลังคลื่นเต่า ย้าาาาาส์!!!</p> -->
                        <div id="image-list">
                            <div class="image-item">
                                <label class="container">
                                    <input type="checkbox" onchange="toggleCheckbox(this)">
                                    <div class="checkmark"></div>
                                </label>
                                <img src="../img/Floor Plan_CC1_1.png" alt="Floor Plan 1">
                                <div class="image-number">1</div>
                            </div>
                            <div class="image-item">
                                <label class="container">
                                    <input type="checkbox" onchange="toggleCheckbox(this)">
                                    <div class="checkmark"></div>
                                </label>
                                <img src="../img/Floor Plan_CC1_2.png" alt="Floor Plan 2">
                                <div class="image-number">2</div>
                            </div>
                            <div class="image-item">
                                <label class="container">
                                    <input type="checkbox" onchange="toggleCheckbox(this)">
                                    <div class="checkmark"></div>
                                </label>
                                <img src="../img/Floor Plan_CC1_3.png" alt="Floor Plan 3">
                                <div class="image-number">3</div>
                            </div>
                            <div class="image-item">
                                <label class="container">
                                    <input type="checkbox" onchange="toggleCheckbox(this)">
                                    <div class="checkmark"></div>
                                </label>
                                <img src="../img/Floor Plan_CC1_4.png" alt="Floor Plan 4">
                                <div class="image-number">4</div>
                            </div>
                            <div class="image-item">
                                <label class="container">
                                    <input type="checkbox" onchange="toggleCheckbox(this)">
                                    <div class="checkmark"></div>
                                </label>
                                <img src="../img/Floor Plan_CC1_5.png" alt="Floor Plan 5">
                                <div class="image-number">5</div>
                            </div>
                            <div class="image-item">
                                <label class="container">
                                    <input type="checkbox" onchange="toggleCheckbox(this)">
                                    <div class="checkmark"></div>
                                </label>
                                <img src="../img/Floor Plan_CC1_6.png" alt="Floor Plan 6">
                                <div class="image-number">6</div>
                            </div>
                        </div>

                    </div>

                    <button class="share-btn">
                        <i class="fa-regular fa-share-from-square"></i> Share
                    </button>
                    <div class="share-options">
                        <p class="title">
                            <span>share</span>
                        </p>
                        <div class="social-media">
                            <a class="social-media-btn" href="https://example.com/folder" target="_blank"><i
                                    class="far fa-folder-open"></i></a>
                            <a class="social-media-btn" href="https://instagram.com/your_username" target="_blank"><i
                                    class="fab fa-instagram"></i></a>
                            <a class="social-media-btn" href="https://facebook.com/your_page" target="_blank"><i
                                    class="fab fa-facebook-f"></i></a>
                            <a class="social-media-btn" href="https://linkedin.com/in/your_username" target="_blank"><i
                                    class="fab fa-linkedin-in"></i></a>
                        </div>
                        <div class="link-container">
                            <input type="text" class="link" value="https://gonnashakethewalls.com" readonly>
                            <button class="copy-btn">คัดลอก</button>
                        </div>
                    </div>
                </ul>
            </div>
        </nav>
    </div>

    <!--  Tools -->
    <nav class="navbar">
        <ul class="navbar__menu">
            <li class="navbar__item">
                <a href="#" id="mark-button" class="navbar__link" onclick="markPoint()">
                    <i data-feather="map-pin"></i><span>MarkPoint</span>
                </a>
            </li>

            <li class="navbar__item">
                <a href="#" id="draw-button" class="navbar__link">
                    <i data-feather="edit-3"></i><span>DrawLine</span>
                </a>
            </li>

            <li class="navbar__item">
                <a href="#" id="clear-button" class="navbar__link">
                    <i data-feather="x-circle"></i><span>Clear</span>
                </a>
            </li>

            <li class="navbar__item">
                <a href="#" id="reset-size" class="navbar__link">
                    <i data-feather="refresh-ccw"></i><span>ResetSize</span>
                </a>
            </li>

            <li class="navbar__item">
                <a href="#" id="fullscreenToggle" class="navbar__link js-toggle-fullscreen-btn toggle-fullscreen-btn"
                    aria-label="Enter fullscreen mode" onclick="toggleFullscreen()">
                    <i data-feather="maximize"></i><span>Fullscreen</span>
                </a>
            </li>

            <li class="navbar__item">
                <a href="#" class="navbar__link"><i data-feather="alert-triangle"></i><span>Warning</span></a>
            </li>
            <li class="navbar__item">
                <a href="#" class="navbar__link"><i data-feather="alert-triangle"></i><span>Warning</span></a>
            </li>
            <li class="navbar__item">
                <a href="#" class="navbar__link"><i data-feather="alert-triangle"></i><span>Warning</span></a>
            </li>
        </ul>
    </nav>

    <!--  The plan -->
    <div id="image-container" class="image-container">
        <div id="document">
            <div id="zoom">
                <!-- <img src="Floor Plan_CC1_1.png" id="floor1" alt="Floor 1" style="display: block;"> -->
                <!-- <img src="Floor Plan_CC1_2.png" id="floor2" alt="Floor 2" style="display: none;"> -->
                <!-- <img src="Floor Plan_CC1_3.png" id="floor3" alt="Floor 3" style="display: none;"> -->
                <!-- <img src="Floor Plan_CC1_4.png" id="floor4" alt="Floor 4" style="display: none;"> -->
                <!-- <img src="Floor Plan_CC1_5.png" id="floor5" alt="Floor 5" style="display: none;"> -->
                <!-- <img src="Floor Plan_CC1_6.png" id="floor6" alt="Floor 6" style="display: none;"> -->

                <img src="<?= $images ?>" id="floor1" alt="Floor 1" style="display: block;"> <!--  ใช้วิธี remove css-->
            </div>
        </div>
    </div>

    <nav>
        <!-- old. -->
        <!-- <ul class="pagination">
            <li class="dt-paging-button page-item">
                <button class="page-link first" onclick="goToPage(1)" role="link" type="button" aria-controls="example"
                    aria-label="First" data-dt-idx="first" tabindex="-1">«</button>
            </li>
            <li class="dt-paging-button page-item">
                <button class="page-link previous" onclick="previousPage()" role="link" type="button"
                    aria-controls="example" aria-label="Previous" data-dt-idx="previous" tabindex="-1">‹</button>
            </li>
            <li class="dt-paging-button page-item active">
                <button class="page-link" onclick="showFloor(1)" role="link" type="button" aria-controls="example"
                    aria-current="page" data-dt-idx="0">1</button>
            </li>
            <li class="dt-paging-button page-item">
                <button class="page-link" onclick="showFloor(2)" role="link" type="button" aria-controls="example"
                    data-dt-idx="1">2</button>
            </li>
            <li class="dt-paging-button page-item">
                <button class="page-link" onclick="showFloor(3)" role="link" type="button" aria-controls="example"
                    data-dt-idx="2">3</button>
            </li>
            <li class="dt-paging-button page-item">
                <button class="page-link" onclick="showFloor(4)" role="link" type="button" aria-controls="example"
                    data-dt-idx="3">4</button>
            </li>
            <li class="dt-paging-button page-item">
                <button class="page-link" onclick="showFloor(5)" role="link" type="button" aria-controls="example"
                    data-dt-idx="4">5</button>
            </li>
            <li class="dt-paging-button page-item">
                <button class="page-link" onclick="showFloor(6)" role="link" type="button" aria-controls="example"
                    data-dt-idx="5">6</button>
            </li>
            <li class="dt-paging-button page-item">
                <button class="page-link next" onclick="nextPage()" role="link" type="button" aria-controls="example"
                    aria-label="Next" data-dt-idx="next" tabindex="-1">›</button>
            </li>
            <li class="dt-paging-button page-item">
                <button class="page-link last" onclick="goToPage(totalPages)" role="link" type="button"
                    aria-controls="example" aria-label="Last" data-dt-idx="last" tabindex="-1">»</button>
            </li>
        </ul> -->

        <!-- new -->
        <ul class="pagination">
            <li class="dt-paging-button page-item <?= ($pages == '1' ? 'active' : '') ?>">
                <button class="page-link" onclick="change_images(1)" role="link" type="button" aria-controls="example"
                    aria-current="page">1</button>
            </li>
            <li class="dt-paging-button page-item <?= ($pages == '2' ? 'active' : '') ?>">
                <button class="page-link" onclick="change_images(2)" role="link" type="button"
                    aria-controls="example">2</button>
            </li>
            <li class="dt-paging-button page-item <?= ($pages == '3' ? 'active' : '') ?>">
                <button class="page-link" onclick="change_images(3)" role="link" type="button"
                    aria-controls="example">3</button>
            </li>
            <li class="dt-paging-button page-item <?= ($pages == '4' ? 'active' : '') ?>">
                <button class="page-link" onclick="change_images(4)" role="link" type="button"
                    aria-controls="example">4</button>
            </li>
            <li class="dt-paging-button page-item <?= ($pages == '5' ? 'active' : '') ?>">
                <button class="page-link" onclick="change_images(5)" role="link" type="button"
                    aria-controls="example">5</button>
            </li>
            <li class="dt-paging-button page-item <?= ($pages == '6' ? 'active' : '') ?>">
                <button class="page-link" onclick="change_images(6)" role="link" type="button"
                    aria-controls="example">6</button>
            </li>
        </ul>
    </nav>

    <!-- Database -->
    <textarea id="line-coordinates" rows="10" cols="125" placeholder="Line coordinaill appear here..."></textarea>

    <button class="button2" id="delete-button">
        <span>Delete All Lines</span>
    </button>
    <button class="button3" id="submit-button">
        <span>Submit Data</span>
    </button>

    <div id="line-list">
        <table>
            <thead>
                <tr>
                    <th name="data">Data</th>
                    <th name="startx">Start X</th>
                    <th name="start_y">Start_Y</th>
                    <th name="end_x">End X</th>
                    <th name="end_y">End y</th>
                </tr>
            </thead>

            <tbody id="line-list-body">
                <!-- Line data will be added here -->
            </tbody>
        </table>
    </div>

    <script src="../script/layer-drawings.js"></script>
    <script src="../script/mark-draw.js"></script>
    <script src="../script/reset-size.js"></script>
    <script src="../script/chang-Image.js"></script>
    <script src="../script/delete-line.js"></script>
    <script src="../script/fullscreen.js"></script>
    <script src="../script/script-in.js"></script>
    <script src="../script/app.js"></script>
    <script src="../script/copy.js"></script>
    <script src="../script/download-modal.js"></script>
    <script src="../script/done-pop.js"></script>

    <script src='https://unpkg.com/feather-icons'></script> <!-- icon Tools -->
    <script src="https://d3js.org/d3.v7.min.js"></script>
    <script> feather.replace(); </script> <!-- Icon หน้าเว็บ -->
</body>

</html>