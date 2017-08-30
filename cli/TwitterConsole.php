<?php

namespace cli;
use Exception;
use OauthPhirehose;
use Phirehose;

require_once(__DIR__ . '/../vendor/autoload.php');
class TwitterConsole extends OauthPhirehose
{
    /**
     * Subclass specific attribs
     */
    protected $myTrackWords = array('Laravel', 'PHP', 'JS', 'Nodejs');
    /**
     * Enqueue each status
     *
     * @param string $status
     */
    public function enqueueStatus($status)
    {
//        send data to nodejs

        $curl = curl_init('http://127.0.0.1:8003/test-tweet');
        curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'POST');
        curl_setopt($curl, CURLOPT_POSTFIELDS, $status);

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        $out = curl_exec($curl);
        curl_close($curl);
        sleep(5);
    }
    /**
     * In this example, we just set the track words to a random 2 words. In a real example, you'd want to check some sort
     * of shared medium (ie: memcache, DB, filesystem) to determine if the filter has changed and set appropriately. The
     * speed of this method will affect how quickly you can update filters.
     */
    public function checkFilterPredicates()
    {
        // This is all that's required, Phirehose will detect the change and reconnect as soon as possible
        $randWord1 = $this->myTrackWords[rand(0, 3)];
        $randWord2 = $this->myTrackWords[rand(0, 3)];
        $this->setTrack(array($randWord1, $randWord2));
    }
}
// The OAuth credentials you received when registering your app at Twitter
define("TWITTER_CONSUMER_KEY", "85TMh9fJW6MhNv5gmsGo0Rbsz");
define("TWITTER_CONSUMER_SECRET", "lZLBHSFv9V5s19tURJhI4z0PUfz5YlJM7T4dpOKcz5M65MSlNc");
define("OAUTH_TOKEN", "902111559496937472-lp5MSIDquEJkUMeUbP8Y0CkvhlTB6i2");
define("OAUTH_SECRET", "X38eRSr9aWsVP8sX6hEvAwJC2Eey5jj0FRSk9CNikdxoh");
// Start streaming
$sc = new TwitterConsole(OAUTH_TOKEN, OAUTH_SECRET, Phirehose::METHOD_FILTER);
$sc->consume();