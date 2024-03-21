<?php

if (!defined('QUFORM_ROOT')) exit;

foreach ($form->getElements() as $element) {
    if (!$element->isHidden() && ($config['showEmptyFields'] || (!$config['showEmptyFields'] && !$element->isEmpty()))) {
        echo $element->getLabel() . "\r\n";
        echo "----------------\r\n";
        echo $element->getValuePlain() . "\r\n\r\n";
    }
}
