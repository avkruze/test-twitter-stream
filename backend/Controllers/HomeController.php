<?php
namespace Controllers;
require_once(__DIR__ . '/../../vendor/autoload.php');
use Windwalker\Renderer\BladeRenderer;

class HomeController
{
    protected $renderer,
                $paths;
    public function __construct()
    {

        $this->paths = array($_SERVER['DOCUMENT_ROOT'].'/templates', 300);
        $this->renderer = new BladeRenderer($this->paths, array('cache_path' => $_SERVER['DOCUMENT_ROOT'] . '/cache'));
    }

    public function index()
    {
        echo $this->renderer->render('main.main', []);
    }

}