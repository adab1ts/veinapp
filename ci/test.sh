#!/bin/bash

set -ev

# Trigger unit and integration testing
ng test --single-run
ng e2e

exit 0
