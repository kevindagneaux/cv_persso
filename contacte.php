<?php

include_once "haut.php";
include_once "config.php";

?>
    <section class="banner_area">
        <div class="banner_inner d-flex align-items-center">
            <div class="container">
                <div class="banner_content text-center">
                    <h2>Contacte</h2>
                </div>
            </div>
        </div>
    </section>

<section class="contact_area section_gap">
        <div class="container">
            <div class="row">
                <div class="col-lg-3">
                    <div class="contact_info">
                        <div class="info_item">
                            <i class="lnr lnr-home"></i>
                            <h3>Brie, les Frauds</h3>
                            <h5>Charente</h5><br>
                        </div>
                        <div class="info_item">
                            <i class="lnr lnr-phone-handset"></i>
                            <h3><a href="#">06 47 35 21 69</a></h3>
                            <h6>Lundi au samedi de 8h-19h</h6><br>
                        </div>
                        <div class="info_item">
                            <i class="lnr lnr-envelope"></i>
                            <h3><a href="#">kevin.dagneaux1@gmail.com</a></h3>
                            <h6>Contacte directe par mail.</h6>
                        </div>
                    </div>
                </div>
                <div class="col-lg-9">
                    <form class="row contact_form" action="ajouter_msg.php" method="post" id="contactForm" novalidate="novalidate">
                        <div class="col-md-6">
                            <div class="form-group">
                                <input type="text" class="form-control" id="nom" name="nom"  placeholder="nom">
                            </div>
                            <div class="form-group">
                                <input type="email" class="form-control" id="email" name="email" placeholder="adresse mail">
                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="objet" name="objet"  placeholder="Sujet du message">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <textarea class="form-control" name="message" id="message" laceholder="Message"></textarea>
                            </div>
                        </div>
                        <div class="col-md-12 text-right">
                            <input type="submit" value="Envoyer votre message" name="envoi" class="primary_btn"><br><br><br>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
<?php
include_once "footer.php";